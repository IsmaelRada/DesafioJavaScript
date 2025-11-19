        // Navegación entre áreas
        document.addEventListener('DOMContentLoaded', function() {
            const areaBtns = document.querySelectorAll('.area-btn');
            const menus = document.querySelectorAll('.menu');
            const menuItems = document.querySelectorAll('.menu-item');
            const exerciseContainers = document.querySelectorAll('.exercise-container');
            const backButtons = document.querySelectorAll('.back-button');
            
            // Mostrar área seleccionada
            areaBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const area = this.id.split('-')[0];
                    
                    // Actualizar botones activos
                    areaBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Ocultar todos los menús
                    menus.forEach(menu => {
                        menu.classList.add('hidden');
                    });
                    
                    // Mostrar menú del área seleccionada
                    document.getElementById(`${area}-menu`).classList.remove('hidden');
                    
                    // Ocultar todos los ejercicios
                    exerciseContainers.forEach(container => {
                        container.classList.remove('active');
                    });
                });
            });
            
            // Mostrar ejercicio seleccionado
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    const exerciseId = this.getAttribute('data-exercise');
                    
                    // Ocultar todos los ejercicios
                    exerciseContainers.forEach(container => {
                        container.classList.remove('active');
                    });
                    
                    // Ocultar todos los menús
                    menus.forEach(menu => {
                        menu.classList.add('hidden');
                    });
                    
                    // Mostrar ejercicio seleccionado
                    document.getElementById(exerciseId).classList.add('active');
                });
            });
            
            // Volver al menú principal
            backButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Ocultar todos los ejercicios
                    exerciseContainers.forEach(container => {
                        container.classList.remove('active');
                    });
                    
                    // Mostrar menú del área activa
                    const activeAreaBtn = document.querySelector('.area-btn.active');
                    const area = activeAreaBtn.id.split('-')[0];
                    document.getElementById(`${area}-menu`).classList.remove('hidden');
                });
            });
            
            // Inicializar todos los ejercicios
            initAstronomyExercises();
            initEnvironmentExercises();
            initHealthExercises();
        });
        
        // ASTRONOMÍA - Inicialización de ejercicios
        function initAstronomyExercises() {
            // Astronomía 1: Clasificación de brillo estelar
            const classifyBtn = document.getElementById('classify-magnitude');
            const magnitudeMarker = document.getElementById('magnitude-marker');
            
            classifyBtn.addEventListener('click', function() {
                const magnitude = parseFloat(document.getElementById('magnitude').value);
                const resultContainer = document.getElementById('magnitude-result');
                
                if (isNaN(magnitude)) {
                    resultContainer.textContent = "Error: Ingresa un valor numérico válido";
                    return;
                }
                
                let classification;
                
                if (magnitude <= -1) {
                    classification = "Extremadamente brillante";
                } else if (magnitude <= 1) {
                    classification = "Muy brillante";
                } else if (magnitude <= 3) {
                    classification = "Brillante";
                } else if (magnitude <= 6) {
                    classification = "Débil";
                } else {
                    classification = "No visible a simple vista";
                }
                
                resultContainer.textContent = `Magnitud: ${magnitude}\nClasificación: ${classification}`;
                
                // PLUS: Visualización de escala de magnitud
                magnitudeMarker.style.display = 'block';
                // Mapear magnitud a posición (de -2 a 6 en la escala)
                const position = ((magnitude + 2) / 8) * 100;
                magnitudeMarker.style.left = `calc(${position}% - 5px)`;
            });
            
            // Astronomía 2: Registrar distancias de planetas
            const setupBtn = document.getElementById('setup-planets');
            const planetInputs = document.getElementById('planet-inputs');
            const planetChart = document.getElementById('planet-chart');
            
            setupBtn.addEventListener('click', function() {
                const count = parseInt(document.getElementById('planet-count').value);
                
                if (isNaN(count) || count < 1) {
                    alert('Por favor, ingresa un número válido de planetas');
                    return;
                }
                
                // Limpiar inputs anteriores
                planetInputs.innerHTML = '';
                
                // Crear inputs para cada planeta
                for (let i = 0; i < count; i++) {
                    const inputGroup = document.createElement('div');
                    inputGroup.className = 'input-group';
                    inputGroup.innerHTML = `
                        <label for="planet-${i}">Distancia del planeta ${i+1} (millones de km):</label>
                        <input type="number" id="planet-${i}" min="0" step="0.1" placeholder="Ej: 150.0">
                    `;
                    planetInputs.appendChild(inputGroup);
                }
                
                // Agregar botón para calcular
                const calculateBtn = document.createElement('button');
                calculateBtn.textContent = 'Calcular Promedio';
                calculateBtn.addEventListener('click', calculatePlanetAverage);
                planetInputs.appendChild(calculateBtn);
            });
            
            function calculatePlanetAverage() {
                const count = parseInt(document.getElementById('planet-count').value);
                const resultContainer = document.getElementById('planet-result');
                let sum = 0;
                let validCount = 0;
                const distances = [];
                
                // Recopilar y validar distancias
                for (let i = 0; i < count; i++) {
                    const distance = parseFloat(document.getElementById(`planet-${i}`).value);
                    if (!isNaN(distance) && distance >= 0) {
                        sum += distance;
                        validCount++;
                        distances.push(distance);
                    }
                }
                
                if (validCount === 0) {
                    resultContainer.textContent = "Error: No se ingresaron distancias válidas";
                    return;
                }
                
                const average = sum / validCount;
                resultContainer.textContent = `Número de planetas: ${validCount}\nDistancia total: ${sum.toFixed(2)} millones de km\nPromedio: ${average.toFixed(2)} millones de km`;
                
                // PLUS: Visualización de gráfico de barras
                planetChart.innerHTML = '';
                const maxDistance = Math.max(...distances);
                
                distances.forEach((distance, index) => {
                    const bar = document.createElement('div');
                    const height = (distance / maxDistance) * 180; // 180px es la altura máxima
                    bar.style.height = `${height}px`;
                    bar.style.width = '40px';
                    bar.style.backgroundColor = `hsl(${index * 60}, 70%, 50%)`;
                    bar.style.display = 'flex';
                    bar.style.alignItems = 'flex-end';
                    bar.style.justifyContent = 'center';
                    bar.style.color = 'white';
                    bar.style.fontSize = '12px';
                    bar.textContent = distance.toFixed(1);
                    planetChart.appendChild(bar);
                });
            }
            
            // Astronomía 3: Contar cráteres lunares grandes
            let craters = [];
            const addCraterBtn = document.getElementById('add-crater');
            const finishCratersBtn = document.getElementById('finish-craters');
            const moonMap = document.getElementById('moon-map');
            
            addCraterBtn.addEventListener('click', function() {
                const diameter = parseFloat(document.getElementById('crater-diameter').value);
                
                if (isNaN(diameter) || diameter < 0) {
                    alert('Por favor, ingresa un diámetro válido');
                    return;
                }
                
                if (diameter === 0) {
                    finishCraterCounting();
                    return;
                }
                
                craters.push(diameter);
                updateCratersList();
                document.getElementById('crater-diameter').value = '';
            });
            
            finishCratersBtn.addEventListener('click', finishCraterCounting);
            
            function updateCratersList() {
                const listContainer = document.getElementById('craters-list');
                listContainer.textContent = craters.map((d, i) => `Crater ${i+1}: ${d} km`).join('\n');
            }
            
            function finishCraterCounting() {
                const resultContainer = document.getElementById('craters-result');
                const largeCraters = craters.filter(d => d > 50);
                
                resultContainer.textContent = `Total de cráteres registrados: ${craters.length}\nCráteres mayores a 50 km: ${largeCraters.length}\nPorcentaje: ${((largeCraters.length / craters.length) * 100).toFixed(1)}%`;
                
                // PLUS: Mapa de distribución de cráteres
                moonMap.innerHTML = '';
                craters.forEach((diameter, index) => {
                    const crater = document.createElement('div');
                    const size = Math.min(30, diameter / 5); // Tamaño proporcional
                    const left = Math.random() * 90 + 5; // Posición aleatoria
                    const top = Math.random() * 90 + 5;
                    
                    crater.style.position = 'absolute';
                    crater.style.left = `${left}%`;
                    crater.style.top = `${top}%`;
                    crater.style.width = `${size}px`;
                    crater.style.height = `${size}px`;
                    crater.style.backgroundColor = diameter > 50 ? '#e74c3c' : '#f39c12';
                    crater.style.borderRadius = '50%';
                    crater.style.border = '1px solid #fff';
                    crater.style.opacity = '0.7';
                    
                    moonMap.appendChild(crater);
                });
                
                craters = []; // Reiniciar para nueva sesión
                updateCratersList();
            }
            
            // Astronomía 4: Identificar cuerpo celeste
            const identifyBtn = document.getElementById('identify-celestial');
            const celestialImage = document.getElementById('celestial-img');
            const imageCaption = document.getElementById('image-caption');
            
            identifyBtn.addEventListener('click', function() {
                const code = document.getElementById('celestial-code').value;
                const resultContainer = document.getElementById('celestial-result');
                
                let body, description;
                
                switch(code) {
                    case '1':
                        body = "Estrella";
                        description = "Cuerpo celeste que emite luz propia debido a reacciones nucleares en su núcleo.";
                        break;
                    case '2':
                        body = "Planeta";
                        description = "Cuerpo celeste que orbita alrededor de una estrella y tiene suficiente masa para tener forma esférica.";
                        break;
                    case '3':
                        body = "Cometa";
                        description = "Cuerpo celeste compuesto de hielo, polvo y rocas que orbita alrededor del Sol siguiendo órbitas muy elípticas.";
                        break;
                    case '4':
                        body = "Asteroide";
                        description = "Cuerpo rocoso más pequeño que un planeta que orbita alrededor del Sol.";
                        break;
                    case '5':
                        body = "Galaxia";
                        description = "Sistema masivo de estrellas, nubes de gas, planetas, polvo, materia oscura y energía unidos gravitacionalmente.";
                        break;
                    default:
                        body = "Desconocido";
                        description = "Código no reconocido.";
                }
                
                resultContainer.textContent = `Código: ${code}\nCuerpo celeste: ${body}\nDescripción: ${description}`;
                
                // PLUS: Galería de imágenes
                celestialImage.style.display = 'block';
                imageCaption.textContent = `Imagen representativa de ${body}`;
                // En una implementación real, aquí cargaríamos una imagen real
                celestialImage.src = `https://via.placeholder.com/300x200/3498db/ffffff?text=${body}`;
            });
            
            // Astronomía 5: Registro de niveles de luz
            let lightReadings = [];
            const addLightBtn = document.getElementById('add-light');
            const lightTimeline = document.getElementById('light-timeline');
            
            addLightBtn.addEventListener('click', function() {
                const lightLevel = parseFloat(document.getElementById('light-level').value);
                
                if (isNaN(lightLevel) || lightLevel < 0) {
                    alert('Por favor, ingresa un nivel de luz válido');
                    return;
                }
                
                lightReadings.push({
                    level: lightLevel,
                    time: new Date().toLocaleTimeString()
                });
                
                updateLightList();
                document.getElementById('light-level').value = '';
            });
            
            function updateLightList() {
                const listContainer = document.getElementById('light-list');
                const resultContainer = document.getElementById('light-result');
                
                listContainer.textContent = lightReadings.map((r, i) => 
                    `Lectura ${i+1}: ${r.level} lux (${r.time})`
                ).join('\n');
                
                // Calcular estadísticas
                const nightReadings = lightReadings.filter(r => r.level < 5);
                const nightPercentage = lightReadings.length > 0 ? 
                    (nightReadings.length / lightReadings.length * 100).toFixed(1) : 0;
                
                resultContainer.textContent = `Total de lecturas: ${lightReadings.length}\nLecturas de noche profunda (<5 lux): ${nightReadings.length}\nPorcentaje: ${nightPercentage}%`;
                
                // PLUS: Gráfico de evolución temporal
                lightTimeline.innerHTML = '';
                const maxLight = Math.max(...lightReadings.map(r => r.level), 1);
                
                lightReadings.forEach((reading, index) => {
                    const bar = document.createElement('div');
                    const height = (reading.level / maxLight) * 180;
                    const width = 100 / lightReadings.length;
                    
                    bar.style.height = `${height}px`;
                    bar.style.width = `${width}%`;
                    bar.style.backgroundColor = reading.level < 5 ? '#3498db' : '#f39c12';
                    bar.style.margin = '0 1px';
                    bar.style.position = 'relative';
                    
                    // Tooltip
                    bar.title = `${reading.level} lux (${reading.time})`;
                    
                    lightTimeline.appendChild(bar);
                });
            }
        }
        
        // MEDIO AMBIENTE - Inicialización de ejercicios
        function initEnvironmentExercises() {
            // Medio Ambiente 1: Calidad del aire (AQI)
            const checkAqiBtn = document.getElementById('check-aqi');
            
            checkAqiBtn.addEventListener('click', function() {
                const aqi = parseInt(document.getElementById('aqi-value').value);
                const resultContainer = document.getElementById('aqi-result');
                const recommendations = document.getElementById('aqi-recommendations');
                
                if (isNaN(aqi) || aqi < 0) {
                    resultContainer.textContent = "Error: Ingresa un valor AQI válido";
                    return;
                }
                
                let quality, color, healthEffects;
                
                if (aqi <= 50) {
                    quality = "Buena";
                    color = "#2ecc71";
                    healthEffects = "La calidad del aire es satisfactoria y representa un riesgo mínimo.";
                } else if (aqi <= 100) {
                    quality = "Moderada";
                    color = "#f39c12";
                    healthEffects = "La calidad del aire es aceptable, pero puede haber preocupación moderada para personas sensibles.";
                } else if (aqi <= 150) {
                    quality = "Dañina para grupos sensibles";
                    color = "#e74c3c";
                    healthEffects = "Efectos en la salud para grupos sensibles. Público general no afectado.";
                } else if (aqi <= 200) {
                    quality = "Dañina";
                    color = "#9b59b6";
                    healthEffects = "Todos pueden comenzar a experimentar efectos en la salud.";
                } else if (aqi <= 300) {
                    quality = "Muy dañina";
                    color = "#e67e22";
                    healthEffects = "Alertas de salud sobre condiciones de emergencia.";
                } else {
                    quality = "Peligrosa";
                    color = "#c0392b";
                    healthEffects = "Alerta de salud: todos pueden experimentar efectos graves.";
                }
                
                resultContainer.innerHTML = `AQI: ${aqi}\nCalidad: <span style="color:${color}">${quality}</span>\nEfectos: ${healthEffects}`;
                
                // PLUS: Recomendaciones de salud
                let recText = "";
                if (aqi <= 50) {
                    recText = "✓ Actividad al aire libre sin restricciones\n✓ Ideal para ejercicio exterior";
                } else if (aqi <= 100) {
                    recText = "✓ Personas sensibles considerar reducir actividad prolongada\n✓ Público general sin restricciones";
                } else if (aqi <= 150) {
                    recText = "✗ Grupos sensibles evitar actividad prolongada\n✓ Público general sin restricciones";
                } else if (aqi <= 200) {
                    recText = "✗ Todos evitar actividad prolongada\n✗ Grupos sensibles evitar cualquier actividad exterior";
                } else {
                    recText = "✗ EVITAR actividades al aire libre\n✗ Permanecer en interiores con aire filtrado";
                }
                
                recommendations.textContent = recText;
            });
            
            // Medio Ambiente 2: Niveles de ruido ambiental
            const setupNoiseBtn = document.getElementById('setup-noise');
            const noiseInputs = document.getElementById('noise-inputs');
            
            setupNoiseBtn.addEventListener('click', function() {
                const count = parseInt(document.getElementById('noise-count').value);
                
                if (isNaN(count) || count < 1) {
                    alert('Por favor, ingresa un número válido de mediciones');
                    return;
                }
                
                // Limpiar inputs anteriores
                noiseInputs.innerHTML = '';
                
                // Crear inputs para cada medición
                for (let i = 0; i < count; i++) {
                    const inputGroup = document.createElement('div');
                    inputGroup.className = 'input-group';
                    inputGroup.innerHTML = `
                        <label for="noise-${i}">Medición ${i+1} de ruido (dB):</label>
                        <input type="number" id="noise-${i}" min="0" step="0.1" placeholder="Ej: 65.5, 80.0">
                    `;
                    noiseInputs.appendChild(inputGroup);
                }
                
                // Agregar botón para calcular
                const calculateBtn = document.createElement('button');
                calculateBtn.textContent = 'Calcular Promedio y Analizar';
                calculateBtn.addEventListener('click', calculateNoiseAnalysis);
                noiseInputs.appendChild(calculateBtn);
            });
            
            function calculateNoiseAnalysis() {
                const count = parseInt(document.getElementById('noise-count').value);
                const resultContainer = document.getElementById('noise-result');
                const impactContainer = document.getElementById('noise-impact');
                let sum = 0;
                let validCount = 0;
                const measurements = [];
                
                // Recopilar y validar mediciones
                for (let i = 0; i < count; i++) {
                    const measurement = parseFloat(document.getElementById(`noise-${i}`).value);
                    if (!isNaN(measurement) && measurement >= 0) {
                        sum += measurement;
                        validCount++;
                        measurements.push(measurement);
                    }
                }
                
                if (validCount === 0) {
                    resultContainer.textContent = "Error: No se ingresaron mediciones válidas";
                    return;
                }
                
                const average = sum / validCount;
                resultContainer.textContent = `Número de mediciones: ${validCount}\nNivel promedio: ${average.toFixed(2)} dB`;
                
                // PLUS: Análisis de impacto en salud
                let impact = "";
                if (average < 55) {
                    impact = "Nivel aceptable. Sin efectos significativos en la salud.";
                } else if (average < 70) {
                    impact = "Puede causar molestias y afectar la calidad del sueño.";
                } else if (average < 85) {
                    impact = "Riesgo de pérdida auditiva con exposición prolongada.";
                } else if (average < 100) {
                    impact = "Alto riesgo de daño auditivo. Se recomienda protección.";
                } else {
                    impact = "Nivel peligroso. Daño auditivo inmediato posible.";
                }
                
                impactContainer.textContent = `Análisis de Impacto:\n${impact}`;
            }
            
        }
        
        // SALUD - Inicialización de ejercicios
        function initHealthExercises() {
            // Salud 1: Clasificación de presión arterial
            const checkPressureBtn = document.getElementById('check-pressure');
            
            checkPressureBtn.addEventListener('click', function() {
                const systolic = parseInt(document.getElementById('systolic').value);
                const diastolic = parseInt(document.getElementById('diastolic').value);
                const resultContainer = document.getElementById('pressure-result');
                const recommendations = document.getElementById('pressure-recommendations');
                
                if (isNaN(systolic) || isNaN(diastolic) || systolic < 50 || diastolic < 30) {
                    resultContainer.textContent = "Error: Ingresa valores válidos para presión arterial";
                    return;
                }
                
                let classification, color;
                
                if (systolic < 120 && diastolic < 80) {
                    classification = "Normal";
                    color = "#2ecc71";
                } else if (systolic < 130 && diastolic < 80) {
                    classification = "Elevada";
                    color = "#f39c12";
                } else if (systolic < 140 || diastolic < 90) {
                    classification = "HTA Grado 1";
                    color = "#e74c3c";
                } else {
                    classification = "HTA Grado 2";
                    color = "#c0392b";
                }
                
                resultContainer.innerHTML = `Presión: ${systolic}/${diastolic} mm Hg\nClasificación: <span style="color:${color}">${classification}</span>`;
                
                // PLUS: Recomendaciones personalizadas
                let recText = "";
                if (classification === "Normal") {
                    recText = "✓ Mantener estilo de vida saludable\n✓ Control anual de presión";
                } else if (classification === "Elevada") {
                    recText = "✓ Reducir consumo de sal\n✓ Aumentar actividad física\n✓ Control cada 6 meses";
                } else if (classification === "HTA Grado 1") {
                    recText = "✗ Consultar con médico\n✓ Cambios en dieta y ejercicio\n✓ Control cada 3 meses";
                } else {
                    recText = "✗ CONSULTA MÉDICA INMEDIATA\n✗ Tratamiento farmacológico probable\n✓ Monitoreo frecuente";
                }
                
                recommendations.textContent = recText;
            });
            
            // Salud 2: Temperatura de pacientes
            const setupPatientsBtn = document.getElementById('setup-patients');
            const patientInputs = document.getElementById('patient-inputs');
            
            setupPatientsBtn.addEventListener('click', function() {
                const count = parseInt(document.getElementById('patient-count').value);
                
                if (isNaN(count) || count < 1) {
                    alert('Por favor, ingresa un número válido de pacientes');
                    return;
                }
                
                // Limpiar inputs anteriores
                patientInputs.innerHTML = '';
                
                // Crear inputs para cada paciente
                for (let i = 0; i < count; i++) {
                    const inputGroup = document.createElement('div');
                    inputGroup.className = 'input-group';
                    inputGroup.innerHTML = `
                        <label for="patient-${i}">Temperatura del paciente ${i+1} (°C):</label>
                        <input type="number" id="patient-${i}" min="35" max="42" step="0.1" placeholder="Ej: 36.5, 38.2">
                    `;
                    patientInputs.appendChild(inputGroup);
                }
                
                // Agregar botón para calcular
                const calculateBtn = document.createElement('button');
                calculateBtn.textContent = 'Calcular Promedio y Analizar';
                calculateBtn.addEventListener('click', calculatePatientAnalysis);
                patientInputs.appendChild(calculateBtn);
            });
            
            function calculatePatientAnalysis() {
                const count = parseInt(document.getElementById('patient-count').value);
                const resultContainer = document.getElementById('patient-result');
                const distributionContainer = document.getElementById('temperature-distribution');
                let sum = 0;
                let validCount = 0;
                const temperatures = [];
                
                // Recopilar y validar temperaturas
                for (let i = 0; i < count; i++) {
                    const temp = parseFloat(document.getElementById(`patient-${i}`).value);
                    if (!isNaN(temp) && temp >= 35 && temp <= 42) {
                        sum += temp;
                        validCount++;
                        temperatures.push(temp);
                    }
                }
                
                if (validCount === 0) {
                    resultContainer.textContent = "Error: No se ingresaron temperaturas válidas";
                    return;
                }
                
                const average = sum / validCount;
                const feverPatients = temperatures.filter(t => t >= 38).length;
                
                resultContainer.textContent = `Pacientes registrados: ${validCount}\nTemperatura promedio: ${average.toFixed(2)}°C\nPacientes con fiebre: ${feverPatients}`;
                
                // PLUS: Análisis de distribución de temperaturas
                distributionContainer.innerHTML = '';
                
                // Crear tabla de distribución
                const ranges = [
                    { min: 35, max: 36.4, label: "Hipotermia" },
                    { min: 36.5, max: 37.5, label: "Normal" },
                    { min: 37.6, max: 38.4, label: "Febrícula" },
                    { min: 38.5, max: 42, label: "Fiebre" }
                ];
                
                let tableHTML = '<table class="data-table"><tr><th>Rango</th><th>Pacientes</th><th>Porcentaje</th></tr>';
                
                ranges.forEach(range => {
                    const countInRange = temperatures.filter(t => t >= range.min && t <= range.max).length;
                    const percentage = (countInRange / validCount * 100).toFixed(1);
                    
                    tableHTML += `<tr>
                        <td>${range.label} (${range.min}-${range.max}°C)</td>
                        <td>${countInRange}</td>
                        <td>${percentage}%</td>
                    </tr>`;
                });
                
                tableHTML += '</table>';
                distributionContainer.innerHTML = tableHTML;
            }
        }