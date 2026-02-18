export const successResponse = (res, data, status = 200) => {
    return res.status(status).json(data);
};

export const errorResponse = (res, message, status = 500) => {
    return res.status(status).json({ error: message });
};