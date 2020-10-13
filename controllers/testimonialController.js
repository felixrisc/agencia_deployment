import {Testimonial} from '../models/Testimoniales.js';

const guardarTestimonial = async (req,res) => {
    // Validar formulario
    let { nombre, correo, mensaje } = req.body;

    let errores = [];
    if (!nombre) {
      errores.push({ mensaje: "Agrega tu nombre" });
    }
    if (!correo) {
      errores.push({ mensaje: "Agrega tu correo" });
    }
    if (!mensaje) {
      errores.push({ mensaje: "Agrega tu mensaje" });
    }

    // Revisar si hubo errores
    if (errores.length > 0) {
        // Consultar Testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        // Muestra la vista con errores
        res.render("testimoniales", {
          errores,
          nombre,
          correo,
          mensaje,
          testimoniales
        });
    } else {
        // Guarda en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}