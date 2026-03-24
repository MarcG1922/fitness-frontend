function Tips() {
  const tips = [
    {
      exercise: "Press de banca",
      objective: "Fuerza",
      tip: "Mantén pies firmes y espalda pegada al banco",
      video: "https://www.youtube.com/embed/gRVjAtPip0Y"
    },
    {
      exercise: "Sentadilla",
      objective: "Pierna",
      tip: "Mantén rodillas alineadas con pies",
      video: "https://www.youtube.com/embed/aclHkVaku9U"
    }
  ];

  return (
    <div>
      <h1>Tips de ejercicios</h1>
      {tips.map((t, i) => (
        <div key={i} style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}>
          <h4>{t.exercise} ({t.objective})</h4>
          <p>{t.tip}</p>
          <iframe 
            width="250" 
            height="150" 
            src={t.video} 
            title={t.exercise} 
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
}

export default Tips;