import { prisma } from "../config/prisma.js";
import { HttpError } from "../utils/httpError.js";

const buildFilters = ({ q, status, priority, category }) => {
  const where = {};

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } }
    ];
  }

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (category) where.category = category;

  return where;
};

export const createTicket = async (payload, userId) => prisma.ticket.create({ 
  data: { 
    ...payload, 
    userId 
  } 
});

export const getTicketById = async (id, userId = null) => {
  const where = { id };
  if (userId) where.userId = userId;
  
  const ticket = await prisma.ticket.findUnique({ 
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
  if (!ticket) {
    throw new HttpError(404, "Ticket not found");
  }
  return ticket;
};

export const listTickets = async (query, userId) => {
  const { page, limit } = query;
  const where = buildFilters(query);
  
  if (userId) {
    where.userId = userId;
  }
  
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      skip,
      take: Math.min(limit, 100),
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        category: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    }),
    prisma.ticket.count({ where })
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit))
    }
  };
};

export const updateTicketStatus = async (id, status, userId = null) => {
  await getTicketById(id, userId);

  return prisma.ticket.update({
    where: { id },
    data: { status, updatedAt: new Date() }
  });
};

export const getTicketStats = async () => {
  try {
    const [statusCounts, priorityCounts, weeklyTrend, recentTickets] = await Promise.all([
      prisma.ticket.groupBy({
        by: ["status"],
        _count: { _all: true }
      }),
      prisma.ticket.groupBy({
        by: ["priority"],
        _count: { _all: true }
      }),
      prisma.$queryRaw`
        SELECT 
          DATE("createdAt") as date,
          COUNT(*) as count
        FROM "tickets"
        WHERE "createdAt" >= NOW() - INTERVAL '14 days'
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,
      prisma.ticket.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })
    ]);

    const open = statusCounts.find((item) => item.status === "OPEN")?._count._all ?? 0;
    const inProgress = statusCounts.find((item) => item.status === "IN_PROGRESS")?._count._all ?? 0;
    const resolved = statusCounts.find((item) => item.status === "RESOLVED")?._count._all ?? 0;
    const critical = priorityCounts.find((item) => item.priority === "CRITICAL")?._count._all ?? 0;

    let trends = weeklyTrend;
    if (!trends || trends.length === 0) {
      const sampleData = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        sampleData.push({
          date: date.toISOString().split('T')[0],
          count: 0
        });
      }
      trends = sampleData;
    }

    const serializeBigInt = (obj) => {
      return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
    };

    return {
      cards: { open, inProgress, resolved, critical },
      trends: serializeBigInt(trends),
      recentTickets: serializeBigInt(recentTickets)
    };
  } catch (error) {
    return {
      cards: { open: 0, inProgress: 0, resolved: 0, critical: 0 },
      trends: [],
      recentTickets: []
    };
  }
};
