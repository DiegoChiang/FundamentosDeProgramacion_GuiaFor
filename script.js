
function traceClone(state, extra = {}) {
  const copy = { ...state };
  if (state.trucks) copy.trucks = state.trucks.map(t => [...t]);
  if (state.seen) copy.seen = state.seen.map(x => ({...x}));
  if (state.stocks) copy.stocks = {...state.stocks};
  if (state.diffs) copy.diffs = {...state.diffs};
  return { ...copy, ...extra };
}

function renderLineConsole(lines) {
  if (!lines || !lines.length) return '<div class="console-line muted">Aún no hay salida.</div>';
  return lines.map(([kind, txt]) => `<div class="console-line ${kind}">${txt}</div>`).join('');
}

function buildProductionTrace() {
  const trace=[]; const state={turn:'—',production:'—',total:0}; const out=[];
  const push=(line,msg,phase='')=>trace.push(traceClone(state,{line,msg,phase,console:[...out]}));
  push(0,'Inicializamos el acumulador total en 0.','Inicialización');
  const vals=[120,130,110];
  vals.forEach((v,i)=>{
    state.turn=i+1; state.production='—';
    push(1,`El for asigna turno = ${i+1}.`,'Nueva iteración');
    state.production=v; out.push(['input',`Ingrese cantidad producida para el turno ${i+1}: ${v}`]);
    push(2,`Leemos ${v} unidades para el turno ${i+1}.`,'Lectura');
    state.total += v;
    push(3,`Actualizamos total: ahora vale ${state.total}.`,'Acumular');
  });
  out.push(['output',`Producción total: ${state.total} unidades`]);
  push(4,'El for terminó después de 3 iteraciones. Mostramos el total.','Salida');
  return trace;
}

function buildToolsTrace() {
  const tools=['Llaves','Destornillador','Martillo','Sierra','Sierra','Llaves','Destornillador','Martillo','Sierra','Llaves','Llaves','Destornillador','Llaves','Sierra','Taladro'];
  const trace=[]; const out=[];
  const state={i:'—',tool:'—',Llaves:0,Destornillador:0,Martillo:0,Sierra:0,Taladro:0};
  const push=(line,msg,test='—',bool=null,phase='')=>trace.push(traceClone(state,{line,msg,test,bool,phase,console:[...out]}));
  push(0,'Inicializamos llaves en 0.','—',null,'Inicialización');
  push(1,'Inicializamos destornilladores en 0.','—',null,'Inicialización');
  push(2,'Inicializamos martillos en 0.','—',null,'Inicialización');
  push(3,'Inicializamos sierras en 0.','—',null,'Inicialización');
  push(4,'Inicializamos taladros en 0.','—',null,'Inicialización');
  const checks=[['Llaves',7,8],['Destornillador',9,10],['Martillo',11,12],['Sierra',13,14],['Taladro',15,16]];
  tools.forEach((tool,idx)=>{
    state.i=idx+1; state.tool='—'; push(5,`El for inicia la iteración ${idx+1} de 15.`,'—',null,'Nueva iteración');
    state.tool=tool; out.push(['input',`Herramienta ${idx+1}: ${tool}`]);
    push(6,`Leemos “${tool}”.`,'—',null,'Lectura');
    for(const [name,checkLine,incLine] of checks){
      const ok=tool===name;
      push(checkLine,`¿La herramienta es ${name}?`,`${tool} == ${name}`,ok,checkLine===7?'Evaluar if':'Evaluar elif');
      if(ok){
        state[name] += 1;
        push(incLine,`Sí. Incrementamos ${name}: ahora vale ${state[name]}.`,'—',null,'Actualizar contador');
        break;
      }
    }
  });
  const outputs=[['Llaves',17],['Destornillador',18],['Martillo',19],['Sierra',20],['Taladro',21]];
  outputs.forEach(([name,line])=>{out.push(['output',`${name}: ${state[name]} unidad(es)`]); push(line,`Mostramos el contador final de ${name}.`,'—',null,'Salida');});
  return trace;
}

function buildAreaTrace() {
  const trace=[]; const state={x:'—',lado2:'—',area:'—',best:-1,xBest:'—'}; const out=[];
  const push=(line,msg,test='—',bool=null,phase='')=>trace.push(traceClone(state,{line,msg,test,bool,phase,console:[...out]}));
  push(0,'Inicializamos area_max = -1.','—',null,'Inicialización');
  push(1,'Inicializamos x_max = None.','—',null,'Inicialización');
  for(let x=10;x<=30;x++){
    state.x=x; state.lado2='—'; state.area='—'; push(2,`El for asigna x = ${x}.`,'—',null,'Nueva iteración');
    state.lado2=100-2*x; push(3,`Calculamos lado2 = 100 - 2×${x} = ${state.lado2}.`,'—',null,'Calcular lado');
    state.area=x*state.lado2; push(4,`Calculamos área = ${x} × ${state.lado2} = ${state.area}.`,'—',null,'Calcular área');
    const prev=state.best; const better=state.area>prev;
    push(5,`Comparamos ${state.area} con el máximo actual ${prev}.`,`${state.area} > ${prev}`,better,'Evaluar if');
    if(better){state.best=state.area; push(6,`Actualizamos area_max = ${state.best}.`,'—',null,'Actualizar máximo'); state.xBest=x; push(7,`Actualizamos x_max = ${x}.`,'—',null,'Guardar x del máximo');}
  }
  out.push(['output',`Área máxima encontrada en cm²: ${state.best}`]); push(8,'Mostramos el área máxima final.','—',null,'Salida');
  out.push(['output',`Valor de x en cm correspondiente: ${state.xBest}`]); push(9,'Mostramos el valor de x que produjo el máximo.','—',null,'Salida');
  return trace;
}

function buildTruckTrace() {
  const packages=[5.5,6.0,3.0,8.0,2.5,6.0,4.5];
  const trace=[]; const out=[];
  const state={i:'—',current:'—',camiones:1,carga:0,total:0,trucks:[[]]};
  const push=(line,msg,test='—',bool=null,phase='')=>trace.push(traceClone(state,{line,msg,test,bool,phase,console:[...out]}));
  push(0,'Inicializamos camiones = 1.','—',null,'Inicialización');
  push(1,'Inicializamos carga_actual = 0.','—',null,'Inicialización');
  push(2,'Inicializamos volumen_total = 0.','—',null,'Inicialización');
  packages.forEach((v,idx)=>{
    state.i=idx+1; state.current='—'; push(3,`El for inicia el paquete ${idx+1}.`,'—',null,'Nueva iteración');
    state.current=v; out.push(['input',`Volumen paquete ${idx+1}: ${v} m³`]); push(4,`Leemos ${v} m³.`,'—',null,'Lectura');
    const candidate=state.carga+v; const over=candidate>20;
    push(5,`Comparamos carga_actual + volumen = ${state.carga.toFixed(1)} + ${v.toFixed(1)} = ${candidate.toFixed(1)}.`,`${candidate.toFixed(1)} > 20`,over,'Evaluar if');
    if(over){state.camiones+=1; state.trucks.push([]); push(6,`Abrimos un nuevo camión. camiones = ${state.camiones}.`,'—',null,'Nuevo camión'); state.carga=0; push(7,'Reiniciamos carga_actual = 0 para el nuevo camión.','—',null,'Reiniciar carga');}
    state.carga+=v; state.trucks[state.trucks.length-1].push(v); push(8,`Cargamos el paquete. carga_actual = ${state.carga.toFixed(1)}.`,'—',null,'Acumular carga');
    state.total+=v; push(9,`Actualizamos volumen_total = ${state.total.toFixed(1)}.`,'—',null,'Acumular total');
  });
  out.push(['output',`Cantidad total de camiones empleados: ${state.camiones}`]); push(10,'Mostramos la cantidad de camiones usados.','—',null,'Salida');
  out.push(['output',`Volumen total de los paquetes cargados: ${state.total.toFixed(1)} m³`]); push(11,'Mostramos el volumen total de todos los paquetes.','—',null,'Salida');
  return trace;
}

function buildClientTrace() {
  const clients=[
    {name:'Luis',cat:'A',amount:80},
    {name:'Marta',cat:'B',amount:600},
    {name:'Juan',cat:'C',amount:1500},
    {name:'Elena',cat:'B',amount:90}
  ];
  const trace=[]; const out=[];
  const state={i:'—',name:'—',cat:'—',amount:'—',discount:'—',final:'—',A:0,B:0,C:0,consuelo:0,leader:'—',leaderCat:'—',leaderFinal:-1,seen:[]};
  const push=(line,msg,test='—',bool=null,phase='')=>trace.push(traceClone(state,{line,msg,test,bool,phase,console:[...out]}));
  push(0,'Inicializamos los contadores A, B, C y consuelo en 0.','—',null,'Inicialización');
  push(1,'Inicializamos mayor_final = -1.','—',null,'Inicialización');
  push(2,'Inicializamos los datos del cliente con mayor monto final.','—',null,'Inicialización');
  clients.forEach((c,idx)=>{
    state.i=idx+1; state.name='—'; state.cat='—'; state.amount='—'; state.discount='—'; state.final='—';
    push(3,`El for inicia el cliente ${idx+1}.`,'—',null,'Nueva iteración');
    state.name=c.name; out.push(['input',`Nombre cliente ${idx+1}: ${c.name}`]); push(4,`Leemos el nombre: ${c.name}.`,'—',null,'Lectura');
    state.cat=c.cat; out.push(['input',`Categoría: ${c.cat}`]); push(5,`Leemos la categoría: ${c.cat}.`,'—',null,'Lectura');
    const invalid=!['A','B','C'].includes(c.cat); push(6,'Validamos que la categoría sea A, B o C.',`${c.cat} not in (A,B,C)`,invalid,'Validar categoría');
    state.amount=c.amount; out.push(['input',`Monto de compra: S/ ${c.amount}`]); push(8,`Leemos el monto: S/ ${c.amount}.`,'—',null,'Lectura');
    let discount=0, consuelo=false;
    const a=c.cat==='A' && c.amount<100; push(9,'Evaluamos la regla de categoría A.',`cat == A and monto < 100`,a,'Evaluar if');
    if(a){discount=c.amount*.03; state.discount=discount; push(10,`Aplicamos 3%: descuento = S/ ${discount.toFixed(2)}.`,'—',null,'Calcular descuento');}
    else {
      const b=c.cat==='B' && c.amount>=100 && c.amount<=1000; push(11,'Evaluamos la regla de categoría B.',`cat == B and 100 <= monto <= 1000`,b,'Evaluar elif');
      if(b){discount=50; state.discount=discount; push(12,'Aplicamos descuento fijo de S/ 50.','—',null,'Calcular descuento');}
      else {
        const cc=c.cat==='C' && c.amount>1000; push(13,'Evaluamos la regla de categoría C.',`cat == C and monto > 1000`,cc,'Evaluar elif');
        if(cc){discount=c.amount*.12; state.discount=discount; push(14,`Aplicamos 12%: descuento = S/ ${discount.toFixed(2)}.`,'—',null,'Calcular descuento');}
        else {push(15,'Ninguna regla principal se cumplió: entramos al else.','—',null,'Else'); discount=5; state.discount=discount; push(16,'Aplicamos descuento consuelo de S/ 5.','—',null,'Calcular descuento'); state.consuelo+=1; consuelo=true; push(17,`Incrementamos consuelo = ${state.consuelo}.`,'—',null,'Actualizar contador');}
      }
    }
    state.final=c.amount-discount; push(18,`Monto final = ${c.amount} - ${discount.toFixed(2)} = S/ ${state.final.toFixed(2)}.`,'—',null,'Calcular monto final');
    const isA=c.cat==='A'; push(19,'¿La categoría es A?',`${c.cat} == A`,isA,'Clasificar categoría');
    if(isA){state.A++; push(20,`contA = ${state.A}.`,'—',null,'Actualizar contador');}
    else {const isB=c.cat==='B'; push(21,'Como no es A, evaluamos si es B.',`${c.cat} == B`,isB,'Clasificar categoría'); if(isB){state.B++; push(22,`contB = ${state.B}.`,'—',null,'Actualizar contador');} else {push(23,'No es A ni B, así que corresponde a C.','—',null,'Else'); state.C++; push(24,`contC = ${state.C}.`,'—',null,'Actualizar contador');}}
    const greater=state.final>state.leaderFinal; push(25,`Comparamos S/ ${state.final.toFixed(2)} con el mayor actual ${state.leaderFinal<0?'—':'S/ '+state.leaderFinal.toFixed(2)}.`,`final > mayor_final`,greater,'Evaluar máximo');
    if(greater){state.leaderFinal=state.final; push(26,`Actualizamos mayor_final = S/ ${state.leaderFinal.toFixed(2)}.`,'—',null,'Actualizar máximo'); state.leader=c.name; push(27,`Guardamos nombre_mayor = ${c.name}.`,'—',null,'Guardar nombre'); state.leaderCat=c.cat; push(28,`Guardamos categoria_mayor = ${c.cat}.`,'—',null,'Guardar categoría');}
    state.seen.push({name:c.name,cat:c.cat,amount:c.amount,discount,final:state.final,consuelo});
    out.push(['output',`${c.name} - Monto final: S/ ${state.final.toFixed(2)}`]); push(29,`Mostramos el resultado de ${c.name}.`,'—',null,'Salida por cliente');
  });
  const n=clients.length;
  state.pctA=(state.A/n*100).toFixed(0)+'%'; push(30,`Calculamos %A = ${state.pctA}.`,'—',null,'Estadística');
  state.pctB=(state.B/n*100).toFixed(0)+'%'; push(31,`Calculamos %B = ${state.pctB}.`,'—',null,'Estadística');
  state.pctC=(state.C/n*100).toFixed(0)+'%'; push(32,`Calculamos %C = ${state.pctC}.`,'—',null,'Estadística');
  state.pctCons=(state.consuelo/n*100).toFixed(0)+'%'; push(33,`Calculamos % con descuento consuelo = ${state.pctCons}.`,'—',null,'Estadística');
  out.push(['output',`Porcentaje por categoría: A: ${state.pctA}, B: ${state.pctB}, C: ${state.pctC}`]);
  out.push(['output',`Porcentaje con Descuento Consuelo: ${state.pctCons}`]);
  out.push(['output',`Cliente con mayor monto final: ${state.leader} (S/ ${state.leaderFinal.toFixed(2)}, categoría ${state.leaderCat})`]);
  push(34,'Mostramos el reporte estadístico final.','—',null,'Salida global');
  return trace;
}

function buildDictionaryTrace() {
  const data=[['Pieza A',100,90],['Pieza B',60,70],['Pieza C',80,80]];
  const trace=[]; const out=[];
  const state={N:'—',i:'—',name:'—',A:'—',B:'—',product:'—',values:'—',stocks:{},diffs:{}};
  const push=(line,msg,phase='')=>trace.push(traceClone(state,{line,msg,phase,console:[...out]}));
  push(0,'Creamos stocks como diccionario vacío.','Inicialización');
  state.N=3; out.push(['input','Cantidad de productos a comparar: 3']); push(1,'Leemos N = 3.','Lectura');
  data.forEach((d,idx)=>{
    state.i=idx+1; state.name='—'; state.A='—'; state.B='—'; push(2,`El primer for inicia el producto ${idx+1}.`,'Nueva iteración');
    state.name=d[0]; out.push(['input',`Nombre: ${d[0]}`]); push(3,`Leemos el nombre ${d[0]}.`,'Lectura');
    state.A=d[1]; out.push(['input',`Stock A: ${d[1]}`]); push(4,`Leemos stock A = ${d[1]}.`,'Lectura');
    state.B=d[2]; out.push(['input',`Stock B: ${d[2]}`]); push(5,`Leemos stock B = ${d[2]}.`,'Lectura');
    state.stocks[d[0]]=[d[1],d[2]]; push(6,`Guardamos '${d[0]}': (${d[1]}, ${d[2]}) en stocks.`,'Guardar en diccionario');
  });
  push(7,'Creamos diferencias como diccionario vacío.','Inicialización');
  data.forEach((d,idx)=>{
    state.product=d[0]; state.values=[d[1],d[2]]; push(8,`El segundo for toma ${d[0]} y su tupla.`,'Nueva iteración');
    state.A=d[1]; state.B=d[2]; push(9,`Desempaquetamos valores: a = ${d[1]}, b = ${d[2]}.`,'Desempaquetar');
    state.diffs[d[0]]=d[1]-d[2]; push(10,`Calculamos ${d[1]} - ${d[2]} = ${d[1]-d[2]} y lo guardamos.`,'Calcular diferencia');
  });
  out.push(['output',`Stocks: {'Pieza A': (100, 90), 'Pieza B': (60, 70), 'Pieza C': (80, 80)}`]); push(11,'Mostramos el diccionario original.','Salida');
  out.push(['output',`Diferencias: {'Pieza A': 10, 'Pieza B': -10, 'Pieza C': 0}`]); push(12,'Mostramos el diccionario de diferencias.','Salida');
  return trace;
}

const slides = [
  {
    title: "¿Qué hace realmente un for?",
    short: "Idea central",
    steps: 6,
    render(step) {
      const samples = [
        {
          iteracion: '1 de 3',
          valor: '1',
          salida: ['1'],
          chips: [true,false,false],
          linea: 'Mostrar 1'
        },
        {
          iteracion: '2 de 3',
          valor: '2',
          salida: ['1','2'],
          chips: [false,true,false],
          linea: 'Mostrar 2'
        },
        {
          iteracion: '3 de 3',
          valor: '3',
          salida: ['1','2','3'],
          chips: [false,false,true],
          linea: 'Mostrar 3'
        }
      ];

      const beats = [
        `
          <div class="slide-kicker">01 · Idea central</div>
          <h2 class="slide-title">FOR significa: <span class="highlight">“repite una vez por cada valor de una secuencia”</span></h2>
          <p class="slide-subtitle">Es ideal cuando conocemos de antemano cuántas veces queremos repetir algo, o cuando queremos recorrer una colección completa.</p>
          <div class="flow">
            <div class="flow-node active">Tomar siguiente valor</div><div class="flow-arrow">→</div>
            <div class="flow-node">Guardar en variable</div><div class="flow-arrow">→</div>
            <div class="flow-node">Ejecutar bloque</div><div class="flow-arrow">↺</div>
          </div>
          <div class="step-callout"><strong>Pregunta guía</strong><span>“¿Sobre qué valores o elementos quiero repetir exactamente lo mismo?”</span></div>
        `,
        `
          <div class="slide-kicker">01 · Idea central</div>
          <h2 class="slide-title">La idea más importante: <span class="highlight">la variable cambia sola</span> en cada vuelta.</h2>
          <div class="grid-2">
            <div class="card accent-card">
              <h3>Cuando usar FOR</h3>
              <p>10 productos, 3 turnos, 30 días, valores de x entre 10 y 30, o todos los elementos de una lista o diccionario.</p>
            </div>
            <div class="card">
              <h3>Qué NO hacemos</h3>
              <p>No escribimos manualmente <code>i = i + 1</code>. La secuencia ya define cuál es el siguiente valor.</p>
            </div>
          </div>
          <div class="big-equation">1 → 2 → 3 → 4 → 5 → …</div>
        `,
        ...samples.map((sample, offset) => `
          <div class="slide-kicker">01 · Idea central</div>
          <h2 class="slide-title">En cada vuelta, <span class="highlight">i recibe un valor distinto</span>.</h2>
          <div class="logic-board">
            <div>
              <div class="micro-tag" style="margin-bottom:10px">PSEUDOCÓDIGO</div>
              <div class="code">
                <span class="code-line active"><span class="kw">Para</span> i desde 1 hasta 3:</span>
                <span class="code-line active">&nbsp;&nbsp;&nbsp;&nbsp;${sample.linea}</span>
              </div>
              <div class="iteration-strip">
                <div class="iteration-chip ${sample.chips[0] ? 'active' : (offset > 0 ? 'done' : '')}">i = 1</div>
                <div class="iteration-chip ${sample.chips[1] ? 'active' : (offset > 1 ? 'done' : '')}">i = 2</div>
                <div class="iteration-chip ${sample.chips[2] ? 'active' : ''}">i = 3</div>
              </div>
            </div>
            <div class="trace-panel">
              ${varBox('iteración actual', sample.iteracion)}
              ${varBox('valor de i', sample.valor)}
              <div class="console">${sample.salida.map(x => `<div class="console-line output">${x}</div>`).join('')}</div>
            </div>
          </div>
          <div class="step-callout"><strong>Lectura del micro-paso</strong><span>En esta iteración, la variable toma el valor ${sample.valor}. Por eso el pseudocódigo ahora ejecuta <code>${sample.linea}</code>.</span></div>
        `),
        `
          <div class="slide-kicker">01 · Idea central</div>
          <h2 class="slide-title">FOR termina cuando <span class="good">ya no quedan valores</span>.</h2>
          <p class="slide-subtitle">No pregunta una condición en cada vuelta como while. Avanza por la secuencia hasta consumirla.</p>
          <div class="iteration-strip">
            <div class="iteration-chip done">1 ✓</div>
            <div class="iteration-chip done">2 ✓</div>
            <div class="iteration-chip done">3 ✓</div>
          </div>
          <div class="step-callout"><strong>Idea clave</strong><span>Si la secuencia tiene 3 valores, el cuerpo se ejecuta 3 veces. Si tiene 15, se ejecuta 15 veces.</span></div>
        `
      ];
      return beats[Math.min(step, beats.length - 1)];
    }
  },
  {
    title: "FOR vs WHILE",
    short: "Diferencia clave",
    steps: 4,
    render(step) {
      const states = [
        {
          title: 'Ambos repiten, pero <span class="highlight">no se usan por la misma razón</span>.',
          note: 'La diferencia no es “qué tan largo es el código”, sino quién controla las repeticiones.',
          forClass: 'accent-card', whileClass: '',
          extra: '<div class="big-equation">FOR → secuencia conocida &nbsp;&nbsp;|&nbsp;&nbsp; WHILE → condición</div>'
        },
        {
          title: 'Con <span class="highlight">FOR</span>, sabes qué valores vas a recorrer.',
          note: 'Ejemplos: 3 turnos, 15 herramientas, 30 días, x desde 10 hasta 30.',
          forClass: 'accent-card', whileClass: '',
          extra: '<div class="code"><span class="code-line active"><span class="kw">Para</span> turno desde 1 hasta 3:</span><span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;leer producción</span></div>'
        },
        {
          title: 'Con <span class="highlight">WHILE</span>, repites mientras una condición siga siendo verdadera.',
          note: 'Ejemplos: mientras el código no sea FIN, mientras la temperatura sea ≤ 90, mientras aprobados < 5.',
          forClass: '', whileClass: 'accent-card',
          extra: '<div class="code"><span class="code-line active"><span class="kw">Mientras</span> temperatura &lt;= 90:</span><span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;leer temperatura</span></div>'
        },
        {
          title: 'La pregunta correcta es: <span class="highlight">“¿qué controla el ciclo?”</span>',
          note: 'Si lo controla una cantidad o secuencia conocida, suele ser FOR. Si lo controla una condición que puede cambiar de forma impredecible, suele ser WHILE.',
          forClass: 'good-card', whileClass: 'warn-card',
          extra: '<div class="step-callout"><strong>Regla rápida</strong><span>FOR = recorrido planificado. WHILE = vigilancia continua de una condición.</span></div>'
        }
      ];
      const s = states[Math.min(step, states.length - 1)];
      return `
        <div class="slide-kicker">02 · Diferencia con WHILE</div>
        <h2 class="slide-title">${s.title}</h2>
        <div class="grid-2">
          <div class="card ${s.forClass}">
            <h3>FOR</h3>
            <p><strong>Control:</strong> una secuencia o una cantidad conocida.</p>
            <p><strong>Pregunta mental:</strong> “¿qué valores va a recorrer la variable?”</p>
          </div>
          <div class="card ${s.whileClass}">
            <h3>WHILE</h3>
            <p><strong>Control:</strong> una condición lógica.</p>
            <p><strong>Pregunta mental:</strong> “¿mientras qué condición debe seguir repitiéndose?”</p>
          </div>
        </div>
        <div style="margin-top:22px">${s.extra}</div>
        <div class="step-callout"><strong>Lectura pedagógica</strong><span>${s.note}</span></div>
      `;
    }
  },
  {
    title: "Pseudocódigo: sintaxis base",
    short: "Sintaxis",
    steps: 7,
    render(step) {
      if (step === 6) {
        return `
          <div class="slide-kicker">03 · Sintaxis · Del pseudocódigo al código</div>
          <h2 class="slide-title">La misma idea: <span class="highlight">Para → for</span></h2>
          <div class="compare-grid">
            <div class="compare-head">PSEUDOCÓDIGO</div><div></div><div class="compare-head">CÓDIGO PYTHON</div>
            <div class="compare-cell"><span class="step-num">1</span><code><span class="kw">Para</span> i desde 1 hasta 5:</code><small>Recorrer 1, 2, 3, 4 y 5.</small></div><div class="compare-arrow">→</div><div class="compare-cell"><code><span class="kw">for</span> i <span class="kw">in</span> range(1, 6):</code><small>El límite final 6 no se incluye.</small></div>
            <div class="compare-cell"><span class="step-num">2</span><code>&nbsp;&nbsp;&nbsp;&nbsp;Mostrar i</code><small>Trabajo repetitivo.</small></div><div class="compare-arrow">→</div><div class="compare-cell"><code>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</code><small>La indentación indica qué pertenece al ciclo.</small></div>
            <div class="compare-cell"><span class="step-num">3</span><code>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">Si</span> i == 3:</code><small>Decisión dentro del ciclo.</small></div><div class="compare-arrow">→</div><div class="compare-cell"><code>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> i == 3:</code><small><b>Si</b> se convierte en <b>if</b>.</small></div>
          </div>
          <div class="step-callout"><strong>Regla de traducción</strong><span>En pseudocódigo usamos palabras conceptuales en español. En código Python usamos la sintaxis real: <code>for</code>, <code>in</code>, <code>range()</code> e <code>if</code>.</span></div>
        `;
      }

      const active = Math.min(step, 5);
      const lines = [
        `<span class="kw">Para</span> i desde inicio hasta fin:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;instrucciones`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">Si</span> se cumple algo:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hacer algo adicional`
      ];
      const cards = [
        ['1. Variable de recorrido', 'i toma automáticamente cada valor de la secuencia.'],
        ['2. Inicio y fin', 'Definen qué valores serán recorridos.'],
        ['3. Cuerpo', 'Todo lo indentado se repite una vez por cada valor.'],
        ['4. Decisiones internas', 'Podemos usar Si dentro del Para para clasificar, contar o filtrar.'],
        ['5. No incrementamos manualmente', 'El Para avanza solo al siguiente valor.']
      ];
      return `
        <div class="slide-kicker">03 · Sintaxis</div>
        <h2 class="slide-title">La anatomía de un <span class="highlight">Para</span></h2>
        <p class="slide-subtitle">Primero construimos la idea en pseudocódigo. Luego la traducimos a Python.</p>
        <div class="grid-2">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">PSEUDOCÓDIGO</div>
            <div class="code">${lines.map((l,i)=>`<span class="code-line ${active>0 && i===Math.min(active-1,3)?'active':''} ${active>0 && i>Math.min(active-1,3)?'dim':''}">${l}</span>`).join('')}</div>
            <div class="pill-row">
              <span class="pill"><strong>Contador:</strong> cantidad = cantidad + 1</span>
              <span class="pill"><strong>Acumulador:</strong> total = total + valor</span>
              <span class="pill"><strong>Máximo:</strong> comparar y actualizar</span>
            </div>
          </div>
          <div class="trace-panel">
            ${cards.slice(0, active).map((c,i)=>`<div class="card ${i===active-1?'accent-card fade-in':''}"><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('') || `<div class="card accent-card"><h3>Molde completo</h3><p>Identifica la secuencia y el trabajo que debe repetirse.</p></div>`}
          </div>
        </div>
      `;
    }
  },
  {
    title: "Range: qué valores genera",
    short: "Mini laboratorio",
    steps: 5,
    render(step) {
      const examples = [
        {expr:'range(5)', vals:[0,1,2,3,4], note:'Con un solo número, empieza en 0 y se detiene antes de 5.'},
        {expr:'range(1, 6)', vals:[1,2,3,4,5], note:'El inicio sí se incluye. El límite final no.'},
        {expr:'range(10, 31)', vals:[10,11,12,13,'…',28,29,30], note:'Para recorrer de 10 a 30 inclusive, usamos 31 como límite final.'},
        {expr:'range(2, 11, 2)', vals:[2,4,6,8,10], note:'El tercer número es el paso.'},
        {expr:'range(5, 0, -1)', vals:[5,4,3,2,1], note:'También podemos recorrer hacia atrás con un paso negativo.'}
      ];
      const ex = examples[Math.min(step, examples.length-1)];
      return `
        <div class="slide-kicker">04 · Mini laboratorio</div>
        <h2 class="slide-title">Entender <span class="highlight">range()</span> evita muchos errores</h2>
        <div class="grid-2">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code"><span class="code-line active"><span class="kw">for</span> i <span class="kw">in</span> ${ex.expr}:</span><span class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;print(i)</span></div>
            <div class="big-equation">${ex.expr}</div>
            <div class="step-callout"><strong>Qué debes explicar</strong><span>${ex.note}</span></div>
          </div>
          <div>
            <div class="card accent-card"><h3>Valores que recibe i</h3><div class="iteration-strip">${ex.vals.map(v=>`<div class="iteration-chip active">${v}</div>`).join('')}</div></div>
            <div class="source-note">Regla práctica: si quieres llegar hasta N usando <code>range(inicio, fin)</code>, normalmente el segundo argumento será N + 1.</div>
          </div>
        </div>
      `;
    }
  },
  {
    title: "Ejercicio 2 · Producción de 3 turnos",
    short: "Acumulador · línea por línea",
    steps: buildProductionTrace().length,
    render(step) {
      const trace=buildProductionTrace(); const t=trace[Math.min(step,trace.length-1)];
      const code=[
        `total = <span class="num">0</span>`,
        `<span class="kw">for</span> turno <span class="kw">in</span> range(1, 4):`,
        `&nbsp;&nbsp;&nbsp;&nbsp;produccion = int(input(...))`,
        `&nbsp;&nbsp;&nbsp;&nbsp;total = total + produccion`,
        `print(<span class="str">"Producción total:"</span>, total)`
      ];
      return `<div class="slide-kicker">05 · Ejercicio 2 · Ejecución línea por línea</div>
        <h2 class="slide-title">Tres turnos → <span class="highlight">cada línea tiene un efecto</span></h2>
        <div class="logic-board compact-exercise"><div><div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div>
        <div class="code">${code.map((l,i)=>`<span class="code-line ${i===t.line?'active':''}">${l}</span>`).join('')}</div>
        <div class="step-callout"><strong>${t.phase}</strong><span>${t.msg}</span></div></div>
        <div class="trace-panel">${varBox('turno',t.turn)}${varBox('producción',t.production)}${varBox('total',t.total)}<div class="console">${renderLineConsole(t.console)}</div></div></div>`;
    }
  },
  {
    title: "Ejercicio 1 · Contar 15 herramientas",
    short: "Contadores · línea por línea",
    steps: buildToolsTrace().length,
    render(step) {
      const trace=buildToolsTrace(); const t=trace[Math.min(step,trace.length-1)];
      const code=[
        `llaves = 0`,`destornilladores = 0`,`martillos = 0`,`sierras = 0`,`taladros = 0`,
        `<span class="kw">for</span> i <span class="kw">in</span> range(1, 16):`,
        `&nbsp;&nbsp;&nbsp;&nbsp;herramienta = input(...)`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> herramienta == <span class="str">"Llaves"</span>:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;llaves += 1`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> herramienta == <span class="str">"Destornillador"</span>:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;destornilladores += 1`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> herramienta == <span class="str">"Martillo"</span>:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;martillos += 1`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> herramienta == <span class="str">"Sierra"</span>:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sierras += 1`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> herramienta == <span class="str">"Taladro"</span>:`,
        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;taladros += 1`,
        `print(<span class="str">"Llaves:"</span>, llaves)`, `print(<span class="str">"Destornillador:"</span>, destornilladores)`, `print(<span class="str">"Martillo:"</span>, martillos)`, `print(<span class="str">"Sierra:"</span>, sierras)`, `print(<span class="str">"Taladro:"</span>, taladros)`
      ];
      return `<div class="slide-kicker">06 · Ejercicio 1 · Ejecución línea por línea</div><h2 class="slide-title">Cada herramienta atraviesa la cadena de <span class="highlight">if / elif</span></h2>
      <div class="logic-board compact-exercise"><div><div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div><div class="code">${code.map((l,i)=>`<span class="code-line ${i===t.line?'active':''}">${l}</span>`).join('')}</div><div class="step-callout"><strong>${t.phase}</strong><span>${t.msg}</span></div></div>
      <div class="trace-panel"><div class="condition-box"><span class="condition-expression">${t.test}</span>${t.bool===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${t.bool?'bool-true':'bool-false'}">${t.bool?'VERDADERO':'FALSO'}</span>`}</div>${varBox('i',t.i)}${varBox('herramienta',t.tool)}<div class="metric-row">${metric('Llaves',t.Llaves)}${metric('Dest.',t.Destornillador)}${metric('Martillo',t.Martillo)}${metric('Sierra',t.Sierra)}${metric('Taladro',t.Taladro)}</div><div class="console">${renderLineConsole(t.console)}</div></div></div>`;
    }
  },
  {
    title: "Ejercicio 4 · Buscar el área máxima",
    short: "Máximo · línea por línea",
    steps: buildAreaTrace().length,
    render(step) {
      const trace=buildAreaTrace(); const t=trace[Math.min(step,trace.length-1)];
      const code=[`area_max = <span class="num">-1</span>`,`x_max = <span class="kw">None</span>`,`<span class="kw">for</span> x <span class="kw">in</span> range(10, 31):`,`&nbsp;&nbsp;&nbsp;&nbsp;lado2 = 100 - 2 * x`,`&nbsp;&nbsp;&nbsp;&nbsp;area = x * lado2`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> area &gt; area_max:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;area_max = area`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x_max = x`,`print(<span class="str">"Área máxima:"</span>, area_max)`,`print(<span class="str">"x:"</span>, x_max)`];
      const xs=Array.from({length:21},(_,i)=>10+i);
      return `<div class="slide-kicker">07 · Ejercicio 4 · Ejecución línea por línea</div><h2 class="slide-title">Calculamos y comparamos <span class="highlight">una línea a la vez</span></h2><div class="logic-board compact-exercise"><div><div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div><div class="code">${code.map((l,i)=>`<span class="code-line ${i===t.line?'active':''}">${l}</span>`).join('')}</div><div class="step-callout"><strong>${t.phase}</strong><span>${t.msg}</span></div></div><div class="trace-panel"><div class="condition-box"><span class="condition-expression">${t.test}</span>${t.bool===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${t.bool?'bool-true':'bool-false'}">${t.bool?'VERDADERO':'FALSO'}</span>`}</div><div class="metric-row">${metric('x',t.x)}${metric('lado 2',t.lado2)}${metric('área',t.area)}${metric('máximo',t.best)}</div>${varBox('x del máximo',t.xBest)}<div class="area-chart">${xs.map(x=>{const a=x*(100-2*x),h=Math.max(8,Math.round(a/1250*120));return `<div class="area-bar ${typeof t.x==='number'&&x<=t.x?'seen':''} ${x===t.xBest?'best':''} ${x===t.x?'active':''}" style="height:${h}px"></div>`}).join('')}</div><div class="area-axis"><span>x=10</span><span>x=25</span><span>x=30</span></div><div class="console">${renderLineConsole(t.console)}</div></div></div>`;
    }
  },
  {
    title: "Ejercicio 7 · Cargar camiones",
    short: "FOR + IF · línea por línea",
    steps: buildTruckTrace().length,
    render(step) {
      const trace=buildTruckTrace(); const t=trace[Math.min(step,trace.length-1)];
      const code=[`camiones = 1`,`carga_actual = 0`,`volumen_total = 0`,`<span class="kw">for</span> i <span class="kw">in</span> range(1, N + 1):`,`&nbsp;&nbsp;&nbsp;&nbsp;volumen = float(input(...))`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> carga_actual + volumen &gt; 20:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;camiones += 1`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;carga_actual = 0`,`&nbsp;&nbsp;&nbsp;&nbsp;carga_actual += volumen`,`&nbsp;&nbsp;&nbsp;&nbsp;volumen_total += volumen`,`print(<span class="str">"Camiones:"</span>, camiones)`,`print(<span class="str">"Volumen total:"</span>, volumen_total)`];
      return `<div class="slide-kicker">08 · Ejercicio 7 · Ejecución línea por línea</div><h2 class="slide-title">Cada paquete se evalúa <span class="highlight">antes de cargarlo</span></h2><div class="logic-board compact-exercise"><div><div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div><div class="code">${code.map((l,i)=>`<span class="code-line ${i===t.line?'active':''}">${l}</span>`).join('')}</div><div class="step-callout"><strong>${t.phase}</strong><span>${t.msg}</span></div></div><div class="trace-panel"><div class="condition-box"><span class="condition-expression">${t.test}</span>${t.bool===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${t.bool?'bool-true':'bool-false'}">${t.bool?'VERDADERO':'FALSO'}</span>`}</div><div class="metric-row">${metric('paquete',t.i)}${metric('volumen',t.current)}${metric('camiones',t.camiones)}${metric('carga actual',Number(t.carga).toFixed(1))}${metric('total',Number(t.total).toFixed(1))}</div><div class="trucks">${renderTrucks(t.trucks)}</div><div class="console">${renderLineConsole(t.console)}</div></div></div>`;
    }
  },
  {
    title: "Ejercicio 8 · Clientes y descuentos",
    short: "Descuentos · línea por línea",
    steps: buildClientTrace().length,
    render(step) {
      const trace=buildClientTrace(); const t=trace[Math.min(step,trace.length-1)];
      const code=[`contA = contB = contC = consuelo = 0`,`mayor_final = -1`,`nombre_mayor = <span class="str">""</span>; categoria_mayor = <span class="str">""</span>`,`<span class="kw">for</span> i <span class="kw">in</span> range(1, N + 1):`,`&nbsp;&nbsp;&nbsp;&nbsp;nombre = input(...)`,`&nbsp;&nbsp;&nbsp;&nbsp;categoria = input(...)`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">while</span> categoria <span class="kw">not in</span> (<span class="str">"A"</span>, <span class="str">"B"</span>, <span class="str">"C"</span>):`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;categoria = input(...)`,`&nbsp;&nbsp;&nbsp;&nbsp;monto = float(input(...))`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> categoria == <span class="str">"A"</span> <span class="kw">and</span> monto &lt; 100:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;descuento = monto * 0.03`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> categoria == <span class="str">"B"</span> <span class="kw">and</span> 100 &lt;= monto &lt;= 1000:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;descuento = 50`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> categoria == <span class="str">"C"</span> <span class="kw">and</span> monto &gt; 1000:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;descuento = monto * 0.12`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">else</span>:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;descuento = 5`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;consuelo += 1`,`&nbsp;&nbsp;&nbsp;&nbsp;monto_final = monto - descuento`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> categoria == <span class="str">"A"</span>:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contA += 1`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> categoria == <span class="str">"B"</span>:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contB += 1`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">else</span>:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contC += 1`,`&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> monto_final &gt; mayor_final:`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mayor_final = monto_final`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nombre_mayor = nombre`,`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;categoria_mayor = categoria`,`&nbsp;&nbsp;&nbsp;&nbsp;print(nombre, monto_final)`,`pctA = contA / N * 100`,`pctB = contB / N * 100`,`pctC = contC / N * 100`,`pctConsuelo = consuelo / N * 100`,`print(pctA, pctB, pctC, pctConsuelo, nombre_mayor)`];
      const seen=t.seen||[];
      return `<div class="slide-kicker">09 · Ejercicio 8 · Ejecución línea por línea</div><h2 class="slide-title">Descuento, categoría y máximo: <span class="highlight">una decisión por vez</span></h2><div class="grid-2 compact-grid"><div><div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div><div class="code tall-code">${code.map((l,i)=>`<span class="code-line ${i===t.line?'active':''}">${l}</span>`).join('')}</div><div class="step-callout"><strong>${t.phase}</strong><span>${t.msg}</span></div></div><div><div class="condition-box"><span class="condition-expression">${t.test}</span>${t.bool===null?'<span class="bool-pill">—</span>':`<span class="bool-pill ${t.bool?'bool-true':'bool-false'}">${t.bool?'VERDADERO':'FALSO'}</span>`}</div><table class="data-table compact-table"><thead><tr><th>Cliente</th><th>Cat.</th><th>Compra</th><th>Desc.</th><th>Final</th></tr></thead><tbody>${['Luis','Marta','Juan','Elena'].map(name=>{const c=seen.find(x=>x.name===name);return `<tr><td>${c?c.name:'—'}</td><td>${c?c.cat:'—'}</td><td>${c?'S/ '+c.amount.toFixed(2):'—'}</td><td>${c?'S/ '+c.discount.toFixed(2):'—'}</td><td>${c?'S/ '+c.final.toFixed(2):'—'}</td></tr>`}).join('')}</tbody></table><div class="metric-row" style="margin-top:8px">${metric('A',t.A)}${metric('B',t.B)}${metric('C',t.C)}${metric('Consuelo',t.consuelo)}</div><div class="metric-row" style="margin-top:7px">${metric('Cliente actual',t.name)}${metric('Monto final',typeof t.final==='number'?'S/ '+t.final.toFixed(2):t.final)}${metric('Mayor',t.leader)}${metric('Mayor final',t.leaderFinal>=0?'S/ '+t.leaderFinal.toFixed(2):'—')}</div><div class="console">${renderLineConsole(t.console)}</div></div></div>`;
    }
  },
  {
    title: "Ejercicio 10 · Diccionarios y segundo FOR",
    short: "Diccionarios · línea por línea",
    steps: buildDictionaryTrace().length,
    render(step) {
      const trace=buildDictionaryTrace(); const t=trace[Math.min(step,trace.length-1)];
      const code=[`stocks = {}`,`N = int(input(...))`,`<span class="kw">for</span> i <span class="kw">in</span> range(1, N + 1):`,`&nbsp;&nbsp;&nbsp;&nbsp;nombre = input(...)`,`&nbsp;&nbsp;&nbsp;&nbsp;a = int(input(...))`,`&nbsp;&nbsp;&nbsp;&nbsp;b = int(input(...))`,`&nbsp;&nbsp;&nbsp;&nbsp;stocks[nombre] = (a, b)`,`diferencias = {}`,`<span class="kw">for</span> producto, valores <span class="kw">in</span> stocks.items():`,`&nbsp;&nbsp;&nbsp;&nbsp;a, b = valores`,`&nbsp;&nbsp;&nbsp;&nbsp;diferencias[producto] = a - b`,`print(stocks)`,`print(diferencias)`];
      const stockEntries=Object.entries(t.stocks||{}).map(([k,v])=>({name:k,A:v[0],B:v[1]}));
      const diffEntries=Object.entries(t.diffs||{}).map(([k,v])=>({name:k,diff:v}));
      return `<div class="slide-kicker">10 · Ejercicio 10 · Ejecución línea por línea</div><h2 class="slide-title">Primero construimos <span class="highlight">stocks</span>; después construimos diferencias</h2><div class="logic-board compact-exercise"><div><div class="micro-tag" style="margin-bottom:8px">CÓDIGO PYTHON · LÍNEA ACTUAL</div><div class="code">${code.map((l,i)=>`<span class="code-line ${i===t.line?'active':''}">${l}</span>`).join('')}</div><div class="step-callout"><strong>${t.phase}</strong><span>${t.msg}</span></div></div><div class="trace-panel"><div>${varBox('i',t.i)}${varBox('producto actual',t.product)}</div><div><div class="micro-tag" style="margin-bottom:6px">stocks</div><div class="dict-box">${renderStockDict(stockEntries)}</div></div><div><div class="micro-tag" style="margin-bottom:6px">diferencias</div><div class="dict-box">${renderDiffDict(diffEntries)}</div></div><div class="console">${renderLineConsole(t.console)}</div></div></div>`;
    }
  },
  {
    title: "Cierre · Cómo pensar cualquier for",
    short: "Checklist mental",
    steps: 7,
    render(step) {
      const items = [
        ['1','¿Cuántas veces debe repetirse el proceso?'],
        ['2','¿Qué valores debe recorrer la variable?'],
        ['3','¿Qué range() produce exactamente esos valores?'],
        ['4','¿Qué instrucciones van dentro del ciclo?'],
        ['5','¿Necesito contar, acumular, buscar máximo/mínimo o filtrar?'],
        ['6','¿Necesito un if dentro del for?'],
        ['7','¿Estoy recorriendo números, una lista o un diccionario?']
      ];
      const reveal = Math.min(step+1,items.length);
      return `
        <div class="slide-kicker">11 · Cierre</div>
        <h2 class="slide-title">Antes de escribir un FOR, responde estas <span class="highlight">7 preguntas</span></h2>
        <div class="grid-3">${items.slice(0,reveal).map(([n,t],i)=>`<div class="card ${i===reveal-1?'accent-card fade-in':''}"><h3>${n}</h3><p>${t}</p></div>`).join('')}</div>
        ${reveal===items.length?`<div class="step-callout"><strong>Regla final</strong><span>Si puedes enumerar los valores que debe visitar la variable de recorrido y explicar qué ocurre en cada vuelta, ya tienes la estructura del for.</span></div>`:''}
      `;
    }
  }
];

let currentSlide = 0;
let currentStep = 0;

const slideEl = document.getElementById('slide');
const slideNav = document.getElementById('slideNav');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const btnPrevSlide = document.getElementById('btnPrevSlide');
const btnNextSlide = document.getElementById('btnNextSlide');
const btnPrevStep = document.getElementById('btnPrevStep');
const btnNextStep = document.getElementById('btnNextStep');
const helpDialog = document.getElementById('helpDialog');

function varBox(name,value){
  return `<div class="var-box"><div class="var-name">${name}</div><div class="var-value">${value}</div></div>`;
}
function metric(name,value){
  return `<div class="metric-card"><small>${name}</small><strong>${value}</strong></div>`;
}
function pct(part,total){
  if(!total) return '—';
  const v=(part/total)*100;
  return Number.isInteger(v)?`${v}%`:`${v.toFixed(2)}%`;
}

function productionNote(step,total){
  if(step===0) return 'Antes de empezar, el acumulador vale 0.';
  if(step===1) return 'Turno 1: total = 0 + 120 = 120.';
  if(step===2) return 'Turno 2: total = 120 + 130 = 250.';
  if(step===3) return 'Turno 3: total = 250 + 110 = 360.';
  return `Ya no quedan turnos. El acumulador conserva ${total}.`;
}
function productionConsole(step,values){
  const lines=[];
  const n=Math.min(Math.max(step,0),3);
  for(let i=0;i<n;i++) lines.push(['input',`Ingrese cantidad producida para el turno ${i+1}: ${values[i]}`]);
  if(step>=4) lines.push(['output','Producción total: 360 unidades']);
  if(!lines.length) lines.push(['muted','total = 0']);
  return lines.map(([c,t])=>`<div class="console-line ${c}">${t}</div>`).join('');
}

function countTools(arr){
  const c={Llaves:0,Destornillador:0,Martillo:0,Sierra:0,Taladro:0};
  arr.forEach(x=>{ if(c[x]!==undefined) c[x]++; });
  return c;
}
function toolNote(step,current){
  if(step===0) return 'Todos los contadores empiezan en cero.';
  if(step>=1 && step<=15) return `Se lee “${current}”. Solo se incrementa el contador que corresponde a ese tipo.`;
  return 'Después de las 15 iteraciones, cada contador contiene la frecuencia final.';
}
function toolConsole(step,tools){
  const lines=[];
  const n=Math.min(Math.max(step,0),15);
  for(let i=Math.max(0,n-4);i<n;i++) lines.push(['input',`Herramienta ${i+1}: ${tools[i]}`]);
  if(n>4) lines.unshift(['muted','…']);
  if(step>=16){
    lines.push(['output','Llaves: 5']); lines.push(['output','Destornillador: 3']); lines.push(['output','Martillo: 2']); lines.push(['output','Sierra: 4']); lines.push(['output','Taladro: 1']);
  }
  if(!lines.length) lines.push(['muted','Esperando la primera herramienta…']);
  return lines.map(([c,t])=>`<div class="console-line ${c}">${t}</div>`).join('');
}

function areaNote(step,x,area,best){
  if(step===0) return 'Inicializamos el mejor valor antes de recorrer x.';
  if(x!==null){
    const isNew=area===best.area;
    return `Área = ${x} × (100 − 2×${x}) = ${area}. ${isNew?'Es el mejor valor visto hasta ahora, así que actualizamos el máximo.':'No supera el máximo actual; lo conservamos.'}`;
  }
  return `Máximo final: ${best.area} cm² cuando x = ${best.x} cm.`;
}

function truckState(packages){
  const trucks=[[]]; let current=0; let total=0;
  packages.forEach(v=>{
    if(current+v>20){ trucks.push([]); current=0; }
    trucks[trucks.length-1].push(v); current+=v; total+=v;
  });
  return {trucks,current,total};
}
function previewTruck(previous,current){
  const s=truckState(previous);
  return {before:s.current, over:s.current+current>20, candidate:s.current+current};
}
function truckNote(step,current,preview,state){
  if(step===0) return 'Empezamos con el camión 1 vacío.';
  if(current!==null){
    if(preview.over) return `${preview.before.toFixed(1)} + ${current.toFixed(1)} = ${preview.candidate.toFixed(1)} > 20. Ese paquete abre un nuevo camión.`;
    return `${preview.before.toFixed(1)} + ${current.toFixed(1)} = ${preview.candidate.toFixed(1)} ≤ 20. El paquete cabe en el camión actual.`;
  }
  return `Terminamos con ${state.trucks.length} camiones y ${state.total.toFixed(1)} m³ en total.`;
}
function renderTrucks(trucks){
  return trucks.map((pkgs,i)=>{
    const load=pkgs.reduce((a,b)=>a+b,0);
    return `<div class="truck"><div class="truck-head"><strong>Camión ${i+1}</strong><span>${load.toFixed(1)} / 20 m³</span></div><div class="truck-load"><div class="truck-fill" style="width:${Math.min(100,load/20*100)}%"></div></div><div class="package-row">${pkgs.map(v=>`<span class="package">${v.toFixed(1)}</span>`).join('')}</div></div>`;
  }).join('');
}
function truckConsole(step,packages,state){
  const n=Math.min(Math.max(step,0),7); const lines=[];
  for(let i=Math.max(0,n-3);i<n;i++) lines.push(['input',`Volumen paquete ${i+1}: ${packages[i]} m³`]);
  if(n>3) lines.unshift(['muted','…']);
  if(step>=8){ lines.push(['output',`Cantidad total de camiones empleados: ${state.trucks.length}`]); lines.push(['output',`Volumen total: ${state.total.toFixed(1)} m³`]); }
  if(!lines.length) lines.push(['muted','camiones = 1; carga_actual = 0']);
  return lines.map(([c,t])=>`<div class="console-line ${c}">${t}</div>`).join('');
}

function clientNote(step,current,leader){
  if(step===0) return 'Inicializamos contadores y las variables del mayor monto final.';
  if(current){
    if(current.kind==='Consuelo') return `${current.name}: categoría ${current.cat}, compra S/ ${current.amount}. No cumple la regla principal de B, así que recibe S/ 5 de descuento consuelo y paga S/ ${current.final.toFixed(2)}.`;
    return `${current.name}: aplica descuento ${current.kind}. Descuento S/ ${current.discount.toFixed(2)}; monto final S/ ${current.final.toFixed(2)}.`;
  }
  if(step>=5) return `Con los clientes procesados calculamos porcentajes. El mayor monto final es ${leader?leader.name:'—'}.`;
  return 'Continuamos.';
}

function renderStockDict(data){
  if(!data.length) return '{}';
  return `{ ${data.map(d=>`<span class="dict-key">'${d.name}'</span>: <span class="dict-val">(${d.A}, ${d.B})</span>`).join(', ')} }`;
}
function renderDiffDict(data){
  if(!data.length) return '{}';
  return `{ ${data.map(d=>`<span class="dict-key">'${d.name}'</span>: <span class="dict-val">${d.diff}</span>`).join(', ')} }`;
}
function dictionaryPhase(step){
  if(step<=3) return 'Primer FOR: registrar';
  if(step===4) return 'Crear segundo diccionario';
  if(step<=7) return 'Segundo FOR: calcular diferencias';
  return 'Resultado final';
}
function dictionaryNote(step,data){
  if(step===0) return 'stocks empieza vacío.';
  if(step>=1 && step<=3){ const d=data[step-1]; return `Guardamos ${d.name}: (${d.A}, ${d.B}) dentro de stocks.`; }
  if(step===4) return 'Ahora creamos diferencias = {}. Todavía está vacío.';
  if(step>=5 && step<=7){ const d=data[step-5]; return `${d.name}: ${d.A} - ${d.B} = ${d.diff}. Ese resultado se guarda con la misma clave.`; }
  return "El segundo diccionario queda {'Pieza A': 10, 'Pieza B': -10, 'Pieza C': 0}.";
}
function dictConsole(step,data){
  const lines=[];
  const inputCount=Math.min(step,3);
  for(let i=0;i<inputCount;i++) lines.push(['input',`${data[i].name}: A=${data[i].A}, B=${data[i].B}`]);
  if(step>=5){
    const n=Math.min(step-4,3);
    for(let i=0;i<n;i++) lines.push(['output',`${data[i].name}: diferencia = ${data[i].diff}`]);
  }
  if(step>=8) lines.push(['output',"Diferencias: {'Pieza A': 10, 'Pieza B': -10, 'Pieza C': 0}"]);
  if(!lines.length) lines.push(['muted','Esperando productos…']);
  return lines.map(([c,t])=>`<div class="console-line ${c}">${t}</div>`).join('');
}

function buildNav(){
  slideNav.innerHTML=slides.map((s,i)=>`
    <button class="nav-item ${i===currentSlide?'active':''}" onclick="goSlide(${i})">
      <span class="nav-number">${i+1}</span>
      <span class="nav-copy"><strong>${s.title}</strong><span>${s.short}</span></span>
    </button>`).join('');
}
function render(){
  const s=slides[currentSlide];
  const maxStep=Math.max(1,s.steps);
  currentStep=Math.max(0,Math.min(currentStep,maxStep-1));
  slideEl.innerHTML=`<div class="micro-tag">Slide ${currentSlide+1} · Micro-paso ${currentStep+1}/${maxStep}</div>${s.render(currentStep)}`;
  progressBar.style.width=`${((currentStep+1)/maxStep)*100}%`;
  progressText.textContent=`Slide ${currentSlide+1} de ${slides.length} · Paso ${currentStep+1} de ${maxStep}`;
  buildNav();
  btnPrevStep.disabled=currentStep===0;
  btnNextStep.textContent=currentStep===maxStep-1?'Slide siguiente →':'Siguiente paso →';
  btnPrevSlide.disabled=currentSlide===0;
  btnNextSlide.disabled=currentSlide===slides.length-1;
}
function nextStep(){ const s=slides[currentSlide]; if(currentStep<s.steps-1) currentStep++; else if(currentSlide<slides.length-1){currentSlide++;currentStep=0;} render(); }
function prevStep(){ if(currentStep>0) currentStep--; else if(currentSlide>0){currentSlide--;currentStep=slides[currentSlide].steps-1;} render(); }
function nextSlide(){ if(currentSlide<slides.length-1){currentSlide++;currentStep=0;render();} }
function prevSlide(){ if(currentSlide>0){currentSlide--;currentStep=0;render();} }
function goSlide(i){currentSlide=i;currentStep=0;render();}
function restartSlide(){currentStep=0;render();}
function toggleFullscreen(){ if(!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); }

btnNextStep.addEventListener('click',nextStep);
btnPrevStep.addEventListener('click',prevStep);
btnNextSlide.addEventListener('click',nextSlide);
btnPrevSlide.addEventListener('click',prevSlide);
document.getElementById('btnHelp').addEventListener('click',()=>helpDialog.showModal());
document.getElementById('btnCloseHelp').addEventListener('click',()=>helpDialog.close());
document.getElementById('btnFullscreen').addEventListener('click',toggleFullscreen);

document.addEventListener('keydown',(e)=>{
  if(helpDialog.open && e.key!=='Escape') return;
  if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();nextStep();}
  else if(e.key==='ArrowLeft'){e.preventDefault();prevStep();}
  else if(e.key==='ArrowDown'){e.preventDefault();nextSlide();}
  else if(e.key==='ArrowUp'){e.preventDefault();prevSlide();}
  else if(e.key.toLowerCase()==='f') toggleFullscreen();
  else if(e.key.toLowerCase()==='r') restartSlide();
});

render();
