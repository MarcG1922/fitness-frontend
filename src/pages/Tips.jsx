
function Tips() {
  const exercises = [
    {
      name: "Press de banca",
      technique: "Mantén los pies firmes en el suelo y baja la barra controladamente hasta el pecho, luego empuja hacia arriba.",
      explanation: "Ejercicio para pecho, hombros y tríceps. Evita arquear la espalda.",
      video: "https://www.youtube.com/embed/gRVjAtPip0Y"
    },
    {
      name: "Sentadilla",
      technique: "Mantén la espalda recta y baja hasta que los muslos estén paralelos al suelo, luego sube controlando el movimiento.",
      explanation: "Fortalece piernas y glúteos, mejora estabilidad y movilidad.",
      video: "https://www.youtube.com/embed/aclHkVaku9U"
    },
    {
      name: "Peso muerto",
      technique: "Espalda recta, hombros hacia atrás, levanta la barra con las piernas y cadera, manteniendo el core firme.",
      explanation: "Ejercicio completo de fuerza para espalda baja, glúteos y piernas.",
      video: "https://www.youtube.com/embed/ytGaGIn3SjE"
    },
    {
      name: "Press militar",
      technique: "Levanta la barra desde los hombros hasta arriba, sin arquear la espalda y con pies firmes.",
      explanation: "Trabaja hombros y tríceps. Mantén core activo.",
      video: "https://www.youtube.com/embed/qEwKCR5JCog"
    },
    {
      name: "Remo con barra",
      technique: "Inclina el torso hacia adelante, espalda recta, y acerca la barra al abdomen, luego baja controladamente.",
      explanation: "Ejercicio para espalda media y bíceps.",
      video: "https://www.youtube.com/embed/vT2GjY_Umpw"
    },
    {
      name: "Curl de bíceps",
      technique: "Flexiona los codos levantando la barra o mancuernas hasta los hombros, sin mover los brazos.",
      explanation: "Aísla los bíceps. Evita balancear el torso.",
      video: "https://www.youtube.com/embed/ykJmrZ5v0Oo"
    },
    {
      name: "Fondos en paralelas",
      technique: "Baja el cuerpo controladamente manteniendo codos cerca del torso, luego sube extendiendo brazos.",
      explanation: "Ejercicio de tríceps y pecho. Mantén core firme.",
      video: "https://www.youtube.com/embed/2z8JmcrW-As"
    },
    {
      name: "Planchas",
      technique: "Mantén el cuerpo recto apoyado sobre antebrazos y pies, contrayendo el abdomen.",
      explanation: "Fortalece core y mejora estabilidad general.",
      video: "https://www.youtube.com/embed/B296mZDhrP4"
    },
    {
      name: "Zancadas",
      technique: "Da un paso adelante, baja la rodilla trasera casi hasta el suelo, luego vuelve a la posición inicial.",
      explanation: "Fortalece piernas, glúteos y equilibrio.",
      video: "https://www.youtube.com/embed/QOVaHwm-Q6U"
    },
    {
      name: "Dominadas",
      technique: "Cuélgate de la barra, palmas hacia afuera, y sube hasta que el mentón supere la barra, luego baja controladamente.",
      explanation: "Ejercicio de espalda y bíceps. Evita impulsarte con el cuerpo.",
      video: "https://www.youtube.com/embed/eGo4IYlbE5g"
    }
  ];

  return (
    <div className="container">
      <h1>Tips y Técnicas</h1>
      <p>Aprende la técnica correcta y mejora tu entrenamiento con estos ejemplos:</p>

      {exercises.map((ex, index) => (
        <div key={index} className="card" style={{ marginBottom: "20px" }}>
          <h3>{ex.name}</h3>
          <p><strong>Técnica:</strong> {ex.technique}</p>
          <p><strong>Explicación:</strong> {ex.explanation}</p>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={ex.video}
              title={ex.name}
              style={{ position: "absolute", top:0, left:0, width:"100%", height:"100%" }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tips;