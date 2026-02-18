import prisma from "../config/db.js";

export const createTicket = async (data) => {
    return prisma.ticket.create({ data });
};

export const getTickets = async (filters) => {
    const { category, priority, status, search } = filters;

    return prisma.ticket.findMany({
        where: {
            category: category || undefined,
            priority: priority || undefined,
            status: status || undefined,
            OR: search
                ? [
                    { title: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } }
                ]
                : undefined
        },
        orderBy: { createdAt: "desc" }
    });
};

export const updateTicket = async (id, data) => {
    return prisma.ticket.update({
        where: { id: Number(id) },
        data
    });
};

export const getStats = async () => {
    const total = await prisma.ticket.count();
    const open = await prisma.ticket.count({ where: { status: "open" } });

    const priorityBreakdown = await prisma.ticket.groupBy({
        by: ["priority"],
        _count: true
    });

    const categoryBreakdown = await prisma.ticket.groupBy({
        by: ["category"],
        _count: true
    });

    const dailyCounts = await prisma.$queryRaw`
    SELECT DATE("createdAt") as date, COUNT(*) as count
    FROM "Ticket"
    GROUP BY date
  `;

    const avg =
        dailyCounts.reduce((sum, d) => sum + Number(d.count), 0) /
        (dailyCounts.length || 1);

    return {
        total_tickets: total,
        open_tickets: open,
        avg_tickets_per_day: Number(avg.toFixed(2)),
        priority_breakdown: priorityBreakdown,
        category_breakdown: categoryBreakdown
    };
};