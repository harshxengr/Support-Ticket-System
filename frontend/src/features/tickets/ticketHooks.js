import { useEffect, useState } from "react";
import {
    getTickets,
    getStats
} from "./ticketService";

export const useTickets = (filters, refreshKey) => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, [filters, refreshKey]);

    const fetchTickets = async () => {
        const res = await getTickets(filters);
        setTickets(res.data);
    };

    return { tickets, fetchTickets };
};

export const useStats = (refreshKey) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, [refreshKey]);

    const fetchStats = async () => {
        const res = await getStats();
        setStats(res.data);
    };

    return { stats };
};