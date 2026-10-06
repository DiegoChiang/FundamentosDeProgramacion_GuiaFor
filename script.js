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
    short: "Acumulador",
    steps: 5,
    render(step) {
      const values = [120,130,110];
      const processed = Math.min(Math.max(step,0),3);
      const total = values.slice(0, processed).reduce((a,b)=>a+b,0);
      const current = step>=1 && step<=3 ? step : null;
      return `
        <div class="slide-kicker">05 · Ejercicio 2 · Acumulador</div>
        <h2 class="slide-title">Tres turnos → <span class="highlight">tres iteraciones</span></h2>
        <p class="slide-subtitle">El objetivo es sumar 120 + 130 + 110 y obtener una producción total de 360 unidades.</p>
        <div class="logic-board">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">
              <span class="code-line ${step===0?'active':''}">total = <span class="num">0</span></span>
              <span class="code-line ${step>=1 && step<=3?'active':''}"><span class="kw">for</span> turno <span class="kw">in</span> range(1, 4):</span>
              <span class="code-line ${step>=1 && step<=3?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;produccion = int(input(...))</span>
              <span class="code-line ${step>=1 && step<=3?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;total = total + produccion</span>
              <span class="code-line ${step>=4?'active':''}">print(<span class="str">"Producción total:"</span>, total)</span>
            </div>
            <div class="iteration-strip">${[1,2,3].map((v,i)=>`<div class="iteration-chip ${i<processed?'done':i===processed && step>0 && step<=3?'active':''}">turno ${v}</div>`).join('')}</div>
            <div class="step-callout"><strong>${step===0?'Inicialización':step<=3?'Acumular':'Resultado'}</strong><span>${productionNote(step,total)}</span></div>
          </div>
          <div class="trace-panel">
            ${varBox('turno', current ?? (step>=4?'fin':'—'))}
            ${varBox('producción leída', step>=1 && step<=3 ? values[step-1] : '—')}
            ${varBox('total', total)}
            <div class="console">${productionConsole(step, values)}</div>
          </div>
        </div>
      `;
    }
  },
  {
    title: "Ejercicio 1 · Contar 15 herramientas",
    short: "Contadores",
    steps: 17,
    render(step) {
      const tools = ['Llaves','Destornillador','Martillo','Sierra','Sierra','Llaves','Destornillador','Martillo','Sierra','Llaves','Llaves','Destornillador','Llaves','Sierra','Taladro'];
      const processed = Math.min(Math.max(step,0), tools.length);
      const counts = countTools(tools.slice(0, processed));
      const current = step>=1 && step<=15 ? tools[step-1] : '—';
      return `
        <div class="slide-kicker">06 · Ejercicio 1 · Múltiples contadores</div>
        <h2 class="slide-title">Una vuelta por herramienta, <span class="highlight">un contador según el tipo</span></h2>
        <div class="logic-board">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">
              <span class="code-line ${step===0?'active':''}">llaves = destornilladores = martillos = sierras = taladros = 0</span>
              <span class="code-line ${step>=1 && step<=15?'active':''}"><span class="kw">for</span> i <span class="kw">in</span> range(1, 16):</span>
              <span class="code-line ${step>=1 && step<=15?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;herramienta = input(...)</span>
              <span class="code-line ${step>=1 && step<=15?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> herramienta == <span class="str">"Llaves"</span>:</span>
              <span class="code-line ${step>=1 && step<=15?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;llaves += 1</span>
              <span class="code-line ${step>=16?'active':''}">print(llaves, destornilladores, martillos, sierras, taladros)</span>
            </div>
            <div class="iteration-strip">${tools.map((_,i)=>`<div class="iteration-chip ${i<processed?'done':i===processed && step>=1 && step<=15?'active':''}">${i+1}</div>`).join('')}</div>
            <div class="step-callout"><strong>Iteración ${step===0?'—':Math.min(step,15)}</strong><span>${toolNote(step,current)}</span></div>
          </div>
          <div class="trace-panel">
            ${varBox('herramienta actual', current)}
            <div class="metric-row">
              ${metric('Llaves', counts.Llaves)}
              ${metric('Dest.', counts.Destornillador)}
              ${metric('Martillo', counts.Martillo)}
              ${metric('Sierra', counts.Sierra)}
              ${metric('Taladro', counts.Taladro)}
            </div>
            <div class="console">${toolConsole(step, tools)}</div>
          </div>
        </div>
      `;
    }
  },
  {
    title: "Ejercicio 4 · Buscar el área máxima",
    short: "Máximo",
    steps: 23,
    render(step) {
      const xs = Array.from({length:21},(_,i)=>10+i);
      const seenCount = Math.min(Math.max(step,0), xs.length);
      const seen = xs.slice(0,seenCount);
      const rows = seen.map(x=>({x,area:x*(100-2*x)}));
      const best = rows.length ? rows.reduce((a,b)=>b.area>a.area?b:a) : {x:'—',area:'—'};
      const activeX = step>=1 && step<=21 ? xs[step-1] : null;
      const activeArea = activeX!==null ? activeX*(100-2*activeX) : null;
      return `
        <div class="slide-kicker">07 · Ejercicio 4 · Máximo progresivo</div>
        <h2 class="slide-title">El máximo se descubre <span class="highlight">mientras recorremos x = 10…30</span></h2>
        <div class="logic-board">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">
              <span class="code-line ${step===0?'active':''}">area_max = <span class="num">-1</span></span>
              <span class="code-line ${step===0?'active':''}">x_max = <span class="kw">None</span></span>
              <span class="code-line ${step>=1 && step<=21?'active':''}"><span class="kw">for</span> x <span class="kw">in</span> range(10, 31):</span>
              <span class="code-line ${step>=1 && step<=21?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;lado2 = 100 - 2 * x</span>
              <span class="code-line ${step>=1 && step<=21?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;area = x * lado2</span>
              <span class="code-line ${step>=1 && step<=21?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> area &gt; area_max:</span>
              <span class="code-line ${step>=1 && step<=21?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;area_max = area; x_max = x</span>
              <span class="code-line ${step>=22?'active':''}">print(area_max, x_max)</span>
            </div>
            <div class="step-callout"><strong>${activeX!==null?`Probamos x = ${activeX}`:'Resultado'}</strong><span>${areaNote(step,activeX,activeArea,best)}</span></div>
          </div>
          <div class="trace-panel">
            <div class="metric-row">
              ${metric('x actual', activeX ?? '—')}
              ${metric('área actual', activeArea ?? '—')}
              ${metric('mejor área', best.area)}
            </div>
            ${varBox('x que produce el máximo', best.x)}
            <div class="area-chart">${xs.map(x=>{
              const area=x*(100-2*x); const h=Math.max(8,Math.round(area/1250*150));
              const isSeen=seen.includes(x); const isBest=best.x===x; const isActive=activeX===x;
              return `<div title="x=${x}, área=${area}" class="area-bar ${isSeen?'seen':''} ${isBest?'best':''} ${isActive?'active':''}" style="height:${h}px"></div>`;
            }).join('')}</div>
            <div class="area-axis"><span>x=10</span><span>x=25</span><span>x=30</span></div>
          </div>
        </div>
      `;
    }
  },
  {
    title: "Ejercicio 7 · Cargar camiones",
    short: "FOR + IF",
    steps: 9,
    render(step) {
      const packages = [5.5,6.0,3.0,8.0,2.5,6.0,4.5];
      const processed = Math.min(Math.max(step,0),packages.length);
      const state = truckState(packages.slice(0,processed));
      const current = step>=1 && step<=7 ? packages[step-1] : null;
      const preview = current!==null ? previewTruck(packages.slice(0,processed-1),current) : null;
      return `
        <div class="slide-kicker">08 · Ejercicio 7 · Decisión dentro del FOR</div>
        <h2 class="slide-title">Cada paquete entra en el camión actual… <span class="highlight">si cabe</span></h2>
        <div class="logic-board">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">
              <span class="code-line ${step===0?'active':''}">camiones = 1; carga_actual = 0; volumen_total = 0</span>
              <span class="code-line ${step>=1 && step<=7?'active':''}"><span class="kw">for</span> i <span class="kw">in</span> range(1, N + 1):</span>
              <span class="code-line ${step>=1 && step<=7?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;volumen = float(input(...))</span>
              <span class="code-line ${step>=1 && step<=7?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> carga_actual + volumen &gt; 20:</span>
              <span class="code-line ${step>=1 && step<=7?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;camiones += 1; carga_actual = 0</span>
              <span class="code-line ${step>=1 && step<=7?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;carga_actual += volumen</span>
              <span class="code-line ${step>=1 && step<=7?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;volumen_total += volumen</span>
              <span class="code-line ${step>=8?'active':''}">print(camiones, volumen_total)</span>
            </div>
            <div class="step-callout"><strong>${current!==null?`Paquete ${step}: ${current} m³`:'Estado del proceso'}</strong><span>${truckNote(step,current,preview,state)}</span></div>
          </div>
          <div class="trace-panel">
            <div class="metric-row">${metric('camiones',state.trucks.length)}${metric('volumen total',state.total.toFixed(1))}${metric('carga actual',state.current.toFixed(1))}</div>
            <div class="trucks">${renderTrucks(state.trucks)}</div>
            <div class="console">${truckConsole(step,packages,state)}</div>
          </div>
        </div>
      `;
    }
  },
  {
    title: "Ejercicio 8 · Clientes y descuentos",
    short: "Clasificar + máximo",
    steps: 8,
    render(step) {
      const clients = [
        {name:'Luis',cat:'A',amount:80,discount:2.4,final:77.6,kind:'3%'},
        {name:'Marta',cat:'B',amount:600,discount:50,final:550,kind:'S/ 50'},
        {name:'Juan',cat:'C',amount:1500,discount:180,final:1320,kind:'12%'},
        {name:'Elena',cat:'B',amount:90,discount:5,final:85,kind:'Consuelo'}
      ];
      const processed = Math.min(Math.max(step,0), clients.length);
      const seen = clients.slice(0,processed);
      const counts = {A:0,B:0,C:0,consuelo:0};
      seen.forEach(c=>{counts[c.cat]++; if(c.kind==='Consuelo') counts.consuelo++;});
      const leader = seen.length ? seen.reduce((a,b)=>b.final>a.final?b:a) : null;
      const current = step>=1 && step<=4 ? clients[step-1] : null;
      return `
        <div class="slide-kicker">09 · Ejercicio 8 · FOR + validación + máximo</div>
        <h2 class="slide-title">Procesamos cada cliente y vamos construyendo <span class="highlight">estadísticas</span></h2>
        <div class="grid-2">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">
              <span class="code-line ${step===0?'active':''}">contA = contB = contC = consuelo = 0</span>
              <span class="code-line ${step>=1 && step<=4?'active':''}"><span class="kw">for</span> i <span class="kw">in</span> range(1, N + 1):</span>
              <span class="code-line ${step>=1 && step<=4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;nombre = input(...)</span>
              <span class="code-line ${step>=1 && step<=4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;categoria = input(...)</span>
              <span class="code-line ${step>=1 && step<=4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">while</span> categoria <span class="kw">not in</span> (<span class="str">"A"</span>, <span class="str">"B"</span>, <span class="str">"C"</span>): ...</span>
              <span class="code-line ${step>=1 && step<=4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> categoria == <span class="str">"A"</span> <span class="kw">and</span> monto &lt; 100: descuento = monto * 0.03</span>
              <span class="code-line ${step>=1 && step<=4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> categoria == <span class="str">"B"</span> <span class="kw">and</span> 100 &lt;= monto &lt;= 1000: descuento = 50</span>
              <span class="code-line ${step>=1 && step<=4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> categoria == <span class="str">"C"</span> <span class="kw">and</span> monto &gt; 1000: descuento = monto * 0.12</span>
              <span class="code-line ${step>=1 && step<=4?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">else</span>: descuento = 5</span>
              <span class="code-line ${step>=5?'active':''}"># porcentajes y cliente con mayor monto final</span>
            </div>
            <div class="step-callout"><strong>${current?current.name:'Lectura pedagógica'}</strong><span>${clientNote(step,current,leader)}</span></div>
          </div>
          <div>
            <table class="data-table">
              <thead><tr><th>Cliente</th><th>Cat.</th><th>Compra</th><th>Descuento</th><th>Final</th></tr></thead>
              <tbody>${clients.map((c,i)=>`<tr class="${i===processed-1 && step>=1 && step<=4?'active-row':''} ${leader && c.name===leader.name?'leader-row':''}"><td>${i<processed?c.name:'—'}</td><td>${i<processed?c.cat:'—'}</td><td>${i<processed?'S/ '+c.amount.toFixed(2):'—'}</td><td>${i<processed?'S/ '+c.discount.toFixed(2):'—'}</td><td>${i<processed?'S/ '+c.final.toFixed(2):'—'}</td></tr>`).join('')}</tbody>
            </table>
            <div class="metric-row" style="margin-top:12px">${metric('% A', pct(counts.A,processed))}${metric('% B', pct(counts.B,processed))}${metric('% C', pct(counts.C,processed))}</div>
            <div class="metric-row" style="margin-top:10px">${metric('% consuelo',pct(counts.consuelo,processed))}${metric('mayor final',leader?`S/ ${leader.final.toFixed(2)}`:'—')}${metric('cliente',leader?leader.name:'—')}</div>
          </div>
        </div>
      `;
    }
  },
  {
    title: "Ejercicio 10 · Diccionarios y segundo FOR",
    short: "Diccionarios",
    steps: 9,
    render(step) {
      const data = [
        {name:'Pieza A',A:100,B:90,diff:10},
        {name:'Pieza B',A:60,B:70,diff:-10},
        {name:'Pieza C',A:80,B:80,diff:0}
      ];
      const inputCount = Math.min(Math.max(step,0),3);
      const diffCount = Math.min(Math.max(step-4,0),3);
      const inputData = data.slice(0,inputCount);
      const diffData = data.slice(0,diffCount);
      return `
        <div class="slide-kicker">10 · Ejercicio 10 · Dos recorridos</div>
        <h2 class="slide-title">Primero llenamos un diccionario. Luego <span class="highlight">lo recorremos</span>.</h2>
        <div class="grid-2">
          <div>
            <div class="micro-tag" style="margin-bottom:10px">CÓDIGO PYTHON</div>
            <div class="code">
              <span class="code-line ${step<=3?'active':''}">stocks = {}</span>
              <span class="code-line ${step>=1 && step<=3?'active':''}"><span class="kw">for</span> i <span class="kw">in</span> range(1, N + 1):</span>
              <span class="code-line ${step>=1 && step<=3?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;nombre = input(...); a = int(input(...)); b = int(input(...))</span>
              <span class="code-line ${step>=1 && step<=3?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;stocks[nombre] = (a, b)</span>
              <span class="code-line ${step===4?'active':''}">diferencias = {}</span>
              <span class="code-line ${step>=5 && step<=7?'active':''}"><span class="kw">for</span> producto, valores <span class="kw">in</span> stocks.items():</span>
              <span class="code-line ${step>=5 && step<=7?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;a, b = valores</span>
              <span class="code-line ${step>=5 && step<=7?'active':''}">&nbsp;&nbsp;&nbsp;&nbsp;diferencias[producto] = a - b</span>
              <span class="code-line ${step>=8?'active':''}">print(diferencias)</span>
            </div>
            <div class="step-callout"><strong>${dictionaryPhase(step)}</strong><span>${dictionaryNote(step,data)}</span></div>
          </div>
          <div class="trace-panel">
            <div><div class="micro-tag" style="margin-bottom:8px">stocks</div><div class="dict-box">${renderStockDict(inputData)}</div></div>
            <div><div class="micro-tag" style="margin-bottom:8px">diferencias</div><div class="dict-box">${renderDiffDict(diffData)}</div></div>
            <div class="console">${dictConsole(step,data)}</div>
          </div>
        </div>
      `;
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
