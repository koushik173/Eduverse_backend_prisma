const Joi = require('joi');

// SignUp validation middleware
exports.validateSignUp = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    const { name, email, password } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
        const message = "Invalid Input";
        return res.send({ acknowledged: false, message });
    }
      // Validate name
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(name)) {
          const message = "Invalid name format. Only contains letters and whitespaces";
          return res.send({ acknowledged: false, message });
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          const message = "Invalid email format";
          return res.send({ acknowledged: false, message });
      }

      // Validate password
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
          const message =
              "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit";
          return res.send({ acknowledged: false, message });
      }
  
    next();
  };

// login validation middleware
exports.validateLogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      });
      const {email, password } = req.body;
      const { error } = schema.validate(req.body);
      if (error) {
          const message = "Invalid Input";
          return res.send({ acknowledged: false, message });
      }
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const message = "Invalid email format";
            return res.send({ acknowledged: false, message });
        }
        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            const message =
                "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit";
            return res.send({ acknowledged: false, message });
        }
    
      next();
}
