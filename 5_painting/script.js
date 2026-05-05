
   const loginPage = document.getElementById('login-page');
   const projectListPage = document.getElementById('project-list');
   const paintingPage = document.getElementById('painting-page');
   const projects = document.getElementById('projects');
   const paintCanvas = document.getElementById('paint-canvas');
   const ctx = paintCanvas.getContext('2d');
   const saveButton = document.getElementById('save-painting');

   // Login form
   document.getElementById('login-form').addEventListener('submit', (e) => {
       e.preventDefault();
       loginPage.style.display = 'none';
       projectListPage.style.display = 'block';
       generateProjectList();
   });

   // Generate project list
   function generateProjectList() {
       for (let i = 1; i <= 10; i++) {
           const li = document.createElement('li');
           li.textContent = `Project ${String.fromCharCode(64 + i)}`; // A, B, C...
           li.classList.add('button');
           li.style.marginBottom = '10px';
           li.style.cursor = 'pointer';
           li.addEventListener('click', () => {
               projectListPage.style.display = 'none';
               paintingPage.style.display = 'block';
               startPainting();
           });
           projects.appendChild(li);
       }
   }

   // Painting functionality
   let painting = false;
   paintCanvas.addEventListener('mousedown', startDraw);
   paintCanvas.addEventListener('mouseup', endDraw);
   paintCanvas.addEventListener('mousemove', draw);

   function startDraw(e) {
       painting = true;
       draw(e);
   }

   function endDraw() {
       painting = false;
       ctx.beginPath();
   }

   function draw(e) {
       if (!painting) return;
       ctx.lineWidth = 5;
       ctx.lineCap = 'round';
       ctx.strokeStyle = 'black';

       ctx.lineTo(e.offsetX, e.offsetY);
       ctx.stroke();
       ctx.beginPath();
       ctx.moveTo(e.offsetX, e.offsetY);
   }

   // Save painting
   saveButton.addEventListener('click', () => {
       const image = paintCanvas.toDataURL();
       const link = document.createElement('a');
       link.href = image;
       link.download = 'painting.png';
       link.click();
       alert('Painting saved successfully!');
   });