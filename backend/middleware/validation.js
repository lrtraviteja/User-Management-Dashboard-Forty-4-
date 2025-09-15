import pkg from 'validator';
const { isEmail } = pkg;

// Helper function to sanitize string input
export const sanitizeString = (str) => {
    return typeof str === 'string' ? str.trim() : '';
};

// Validation middleware for user data
export const validateUserData = (req, res, next) => {
    let { 
        name,
        email,
        phone,
        street,
        city,
        zipcode,
        geo_lat,
        geo_lng
    } = req.body;
    
    // Sanitize all string inputs
    name = sanitizeString(name);
    email = sanitizeString(email);
    phone = sanitizeString(phone);
    street = sanitizeString(street);
    city = sanitizeString(city);
    zipcode = sanitizeString(zipcode);
    geo_lat = sanitizeString(geo_lat);
    geo_lng = sanitizeString(geo_lng);

    // Validation errors array
    const errors = [];

    // Required field validation
    if (!name) {
        errors.push('Name is required');
    }
    
    if (!email) {
        errors.push('Email is required');
    } else if (!isEmail(email)) {
        errors.push('Invalid email format');
    }

    // Optional field validation
    if (phone && phone.length > 15) {
        errors.push('Phone number is too long (max 15 characters)');
    }

    if (street && street.length > 200) {
        errors.push('Street address is too long (max 200 characters)');
    }
    
    if (city && city.length > 100) {
        errors.push('City name is too long (max 100 characters)');
    }
    
    if (zipcode && zipcode.length > 20) {
        errors.push('Zipcode is too long (max 20 characters)');
    }

    // Coordinate validation
    if (geo_lat && (isNaN(geo_lat) || geo_lat < -90 || geo_lat > 90)) {
        errors.push('Latitude must be a number between -90 and 90');
    }
    
    if (geo_lng && (isNaN(geo_lng) || geo_lng < -180 || geo_lng > 180)) {
        errors.push('Longitude must be a number between -180 and 180');
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
        return res.status(400).json({ 
            error: 'Validation failed', 
            details: errors 
        });
    }

    // Attach sanitized data to request object
    req.sanitizedData = {
        name,
        email,
        phone,
        street,
        city,
        zipcode,
        geo_lat,
        geo_lng,
    };

    next();
};

// Middleware to validate user ID parameter
export const validateUserId = (req, res, next) => {
    const { id } = req.params;
    
    if (!id || isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({ 
            error: 'Invalid user ID. Must be a positive integer.' 
        });
    }
    
    req.userId = parseInt(id);
    next();
};