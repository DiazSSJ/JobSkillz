import React, { useState } from "react";
import "../Tips/Tips.css";
import Navbar from "../../Components/Navbar/Navbar";

function TipsPage() {
  const [openSection, setOpenSection] = useState("");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <div className="app-container">
      <Navbar title="Tips" />
      <div className="tips-layout">
        <div className="text">
          <h1>Consejos para antes, durante y después de una entrevista</h1>
          <div className="section">
            <h2
              className={openSection === "1" ? "selected" : ""}
              onClick={() => toggleSection("1")}
            >
              Antes de la entrevista
              <span className={`arrow ${openSection === "1" ? "open" : ""}`}>
                ^
              </span>
            </h2>
            <ul
              className={openSection === "1" ? "tips-title open" : "tips-title"}
            >
              {/* Tips for before the interview */}
              <li>
                Practica, practica y practica. Es una de las mejores maneras de
                ganar confianza y sentirse cómodo entrevistando. Algunos
                consejos para practicar:
              </li>
              <ul>
                <li>
                  Intenta apagar tu crítico interior y responde con la mayor
                  autenticidad posible.
                </li>
                <li>
                  Revisa tus respuestas desde la perspectiva de un
                  entrevistador. ¿Qué partes de tu respuesta reflejan lo que te
                  gustaría que el entrevistador supiera de ti? ¿Qué partes
                  parecen menos relevantes?
                </li>
                <li>
                  Piensa en las principales mejoras que te gustaría introducir
                  en tus respuestas. A continuación, intenta responder de nuevo
                  teniendo en cuenta esas mejoras.
                </li>
                <li>
                  Identifica qué preguntas te parecen más difíciles.
                  Practicarlas te ayudará a aprender más rápido.
                </li>
                <li>
                  Y lo más importante: sigue practicando. No pasa nada si te
                  resulta difícil. Eso significa que estás mejorando.
                </li>
              </ul>
              <li>
                Hazte algunas preguntas e intenta responderlas con la mayor
                autenticidad posible:
              </li>
              <ul>
                <li>¿Cómo te describirías a ti mismo?</li>
                <li>¿En qué áreas tienes talento?</li>
                <li>
                  ¿Qué ejemplos hay de momentos en los que hayas utilizado esos
                  talentos?
                </li>
                <li>
                  ¿Cómo te han ayudado tus talentos a tener éxito en diferentes
                  áreas de tu vida?
                </li>
                <li>¿Cuáles crees que son tus debilidades más recurrentes?</li>
                <li>¿Cómo afrontas esas debilidades?</li>
                <li>¿Cómo ves tu carrera profesional?</li>
                <li>
                  ¿Cuáles serían tus principales prioridades en tu próximo
                  puesto?
                </li>
              </ul>
              <li>
                Dedica algún tiempo a investigar la empresa, su cultura, el
                equipo y el puesto. Puedes utilizar recursos como el sitio web
                de la empresa, las redes sociales, artículos de prensa y sitios
                web con opiniones de antiguos empleados.
              </li>
              <li>
                Piensa en cómo tus talentos en tu último puesto podrían ser
                útiles en este nuevo puesto.
              </li>
              <li>
                Prepara las preguntas para tu entrevistador pensando
                críticamente en tus expectativas para el puesto.
              </li>
              <li>
                Asegúrate de que tu tecnología está correctamente configurada.
              </li>
              <li>
                Si utilizas tecnologías de apoyo, prepáralas con antelación. Si
                necesitas algún otro tipo de adaptación, pregunta a tu
                entrevistador con antelación.
              </li>
              <li>
                Intenta encontrar un lugar tranquilo y despejado. Asegúrate de
                que la luz esté frente a ti y centra la cámara para que los
                demás puedan verte. Ten cuidado con los fondos, pueden ser
                molestos.
              </li>
              <li>
                Tómate unos momentos para concentrarte y ponerte cómodo. Escucha
                tu canción favorita, medita o simplemente respira hondo.
              </li>
              <li>¡Llega puntual!</li>
            </ul>
          </div>{" "}
          <div className="section">
            <h2
              className={openSection === "2" ? "selected" : ""}
              onClick={() => toggleSection("2")}
            >
              Durante la entrevista
              <span className={`arrow ${openSection === "2" ? "open" : ""}`}>
                ^
              </span>
            </h2>
            <ul
              className={openSection === "2" ? "tips-title open" : "tips-title"}
            >
              {/* Tips for during the interview */}
              <li>
                Escucha atentamente cada pregunta. No pasa nada si te tomas un
                momento para ordenar tus ideas antes de responder.
              </li>
              <li>
                Si no estás seguro de lo que te preguntan, pide a tu
                entrevistador que te lo aclare.
              </li>
              <li>
                Haz hincapié en tus habilidades y logros. Haz saber al
                entrevistador cuáles son tus puntos fuertes y qué te entusiasma.
              </li>
              <li>No tengas miedo de destacar lo mejor de ti mismo.</li>
              <li>
                Sé tú mismo. Es importante ser honesto y auténtico en cada
                respuesta, incluso si eso significa expresar desagrado por
                algunas actividades. No todo tiene que ser positivo.
              </li>
              <li>
                Cuando respondas a preguntas como «¿Por qué dejaste tu último
                trabajo?», no hables mal de tu antiguo jefe, equipo o empresa.
                Céntrate en lo que aprendiste de las situaciones difíciles y en
                cómo creciste.
              </li>
              <li>
                Está bien sentirse nervioso. En lugar de dejar que los nervios
                te distraigan, piensa en lo que realmente está ocurriendo en tu
                cuerpo: tus sistemas están funcionando a toda máquina para
                sobrecargar tu cuerpo y tu cerebro y conseguir el máximo
                rendimiento.
              </li>
            </ul>
          </div>
          <div className="section">
            <h2
              className={openSection === "3" ? "selected" : ""}
              onClick={() => toggleSection("3")}
            >
              Después de la entrevista
              <span className={`arrow ${openSection === "3" ? "open" : ""}`}>
                ^
              </span>
            </h2>
            <ul
              className={openSection === "3" ? "tips-title open" : "tips-title"}
            >
              {/* Tips for after the interview */}
              <li>
                Agradece a tus entrevistadores el tiempo que te han dedicado.
              </li>
              <li>
                Puedes pedir a tus entrevistadores sus direcciones de correo
                electrónico si quieres hacerles preguntas o pedirles más
                información, o simplemente enviarles una nota de agradecimiento.
              </li>
              <li>
                En caso de que no consigas la información de contacto de tu
                entrevistador, puedes pedírsela a tu reclutador o encontrarla en
                sitios de redes profesionales.
              </li>
              <li>
                Asegúrate de personalizar las notas que envíes después. Reitera
                por qué te interesa el puesto y menciona algo memorable de la
                entrevista, ya sea un momento divertido o algo que el
                entrevistador haya contado sobre sí mismo.
              </li>
              <li>
                Pregunta a tu entrevistador cuáles son los siguientes pasos en
                el proceso de selección.
              </li>
            </ul>
          </div>
          <h1 style={{ marginTop: "10vh" }}>
            Consejos para responder a determinados tipos de preguntas
          </h1>
          <div className="section">
            <h2
              className={openSection === "4" ? "selected" : ""}
              onClick={() => toggleSection("4")}
            >
              Preguntas de comportamiento
              <span className={`arrow ${openSection === "4" ? "open" : ""}`}>
                ^
              </span>
            </h2>
            <ul
              className={openSection === "4" ? "tips-title open" : "tips-title"}
            >
              {/* Tips for behavior questions */}
              <li>
                Las preguntas de comportamiento son aquellas que preguntan cómo
                has actuado en situaciones específicas del pasado.
              </li>
              <li>
                Suelen empezar con frases como "Háblame de un momento en el
                que..." o "Dame un ejemplo de...".
              </li>
              <li>
                Los entrevistadores utilizan estas preguntas para hacerse una
                idea de cómo has manejado diversas situaciones y retos en el
                pasado.
              </li>
              <li>
                Para responder a estas preguntas, utiliza el método STAR
                (Situación, Tarea, Acción, Resultado) para estructurar tus
                respuestas:
              </li>
              <ul>
                <li>
                  Situación: Describe el contexto y los antecedentes de la
                  situación.
                </li>
                <li>
                  Tarea: Explica cuál era tu responsabilidad en esa situación.
                </li>
                <li>
                  Acción: Detalla las acciones específicas que tomaste para
                  abordar la situación.
                </li>
                <li>
                  Resultado: Describe el resultado de tus acciones y cualquier
                  logro o aprendizaje que obtuviste.
                </li>
              </ul>
              <li>
                Recuerda ser específico y proporcionar ejemplos concretos de tu
                experiencia.
              </li>
            </ul>
          </div>
          <div className="section">
            <h2
              className={openSection === "5" ? "selected" : ""}
              onClick={() => toggleSection("5")}
            >
              Preguntas técnicas
              <span className={`arrow ${openSection === "5" ? "open" : ""}`}>
                ^
              </span>
            </h2>
            <ul
              className={openSection === "5" ? "tips-title open" : "tips-title"}
            >
              {/* Tips for technical questions */}
              <li>
                Las preguntas técnicas están diseñadas para ver cómo piensas.
                Los jefes de contratación quieren ver que demuestras reflexión y
                capacidad de adaptación a la hora de encontrar soluciones.
              </li>
              <li>
                Prepárate para diferentes estilos de preguntas técnicas. El
                entrevistador puede plantearte un escenario y pedirte que lo
                expliques de principio a fin, o puede pedirte que vayas paso a
                paso, dándote más información después de cada paso.
              </li>
              <li>
                Cuando respondas, dile al entrevistador exactamente lo que
                piensas y por qué. Siempre que hagas una suposición, explica al
                entrevistador por qué la has hecho.
              </li>
              <li>
                Considera estos pasos para responder a una pregunta técnica:
              </li>
              <ul>
                <li>
                  Identifica el problema formulando preguntas exploratorias.
                  ¿Qué ocurrió antes de que surgiera este problema? ¿Qué aspecto
                  tiene el problema?
                </li>
                <li>
                  Evalúa el problema teniendo en cuenta las posibles causas.
                  Comparte tus ideas en voz alta.
                </li>
                <li>
                  Piensa en posibles soluciones basadas en tus conocimientos
                  previos. Menciona los recursos que podrías utilizar para
                  buscar soluciones.
                </li>
                <li>
                  Presenta tus soluciones en el orden en que las probarías. Pon
                  siempre primero la solución más sencilla.
                </li>
                <li>
                  Pon en práctica tus soluciones. Si no eres el responsable
                  directo de poner en práctica la solución, describe claramente
                  las instrucciones que darías a otra persona.
                </li>
                <li>
                  Pon a prueba tu solución. Explica cómo te asegurarías de que
                  tu solución funciona.
                </li>
              </ul>
            </ul>
          </div>
          <div className="section" style={{ paddingBottom: "20%" }}>
            <h2
              className={openSection === "6" ? "selected" : ""}
              onClick={() => toggleSection("6")}
            >
              Preguntas de antecedentes
              <span className={`arrow ${openSection === "6" ? "open" : ""}`}>
                ^
              </span>
            </h2>
            <ul
              className={openSection === "6" ? "tips-title open" : "tips-title"}
            >
              {/* Tips for background questions */}
              <li>
                Las preguntas sobre antecedentes están diseñadas para ayudar al
                entrevistador a comprender mejor su formación, experiencia y los
                motivos por los que desea trabajar en ese puesto.
              </li>
              <li>
                Cuando respondas a preguntas generales como «Háblame de ti»,
                considera la posibilidad de estructurar tus respuestas en
                términos de presente, pasado y futuro. Empieza por el presente,
                hablando de tu función actual, el alcance de la misma y un logro
                reciente que hayas tenido. A continuación, habla del pasado,
                explicando cómo llegaste a tu puesto actual y cualquier otra
                experiencia previa que sea relevante para el puesto que
                solicitas. Por último, habla del futuro y explica qué es lo
                siguiente que quieres hacer y cómo te ayudaría este puesto a
                conseguirlo.
              </li>
              <li>
                La investigación puede ayudarte a responder preguntas como «¿Por
                qué quieres trabajar aquí?». Relee la descripción del puesto y
                piensa qué aspectos te interesan y te entusiasman. Consulta el
                sitio web y las redes sociales de la empresa para hacerte una
                mejor idea de sus valores y de cómo se alinean con los tuyos.
              </li>
              <li>
                Sé fiel a ti mismo. Sé sincero sobre lo que quieres y lo que no
                quieres del puesto. No te centres únicamente en tu experiencia y
                tus méritos. Piensa también en tus talentos y pasiones.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TipsPage;
