export const isAdmin = (req, res, next) => {
	if (req.payload.role === 'Leader') {
		next();
	} else {
		return next(new ErrorResponse('Access denied, you must be an Leader', 401));
	}
};
