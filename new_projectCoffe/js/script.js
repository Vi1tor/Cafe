 // Itens do menu
        const menuItems = [
            "Misto quente", "Queijo quente", "Presunto", "Mussarela", "Queijo Minas",
            "Manteiga", "Requeijão", "Geleia", "Mel", "Achocolatado em pó",
            "Pão de queijo", "Frutas da estação", "Pamonha", "Bolo", "Pão francês",
            "Leite", "Leite sem Lactose", "Suco de Laranja", "Iogurte", "Granola",
            "Café Coado", "Ovos Fritos", "Omelete", "Ovos Mexidos", 
            "Tapioca de Queijo minas", "Tapioca de presunto e queijo"
        ];

        // Preenche a tabela com os itens
        const tableBody = document.querySelector('#itemsTable tbody');
        function populateItemsTable() {
            menuItems.forEach(item => {
                const row = document.createElement('tr');
                
                const nameCell = document.createElement('td');
                nameCell.textContent = item;
                nameCell.style.textAlign = 'left';
                row.appendChild(nameCell);
                
                // Adiciona opções de quantidade (0 a 2)
                for (let i = 0; i <= 2; i++) {
                    const qtyCell = document.createElement('td');
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = item.replace(/\s+/g, '_');
                    radio.value = i;
                    radio.id = `${item.replace(/\s+/g, '_')}_${i}`;
                    
                    if (i === 0) {
                        radio.checked = true;
                    }
                    
                    const label = document.createElement('label');
                    label.htmlFor = radio.id;
                    label.textContent = i;
                    
                    qtyCell.appendChild(radio);
                    qtyCell.appendChild(label);
                    row.appendChild(qtyCell);
                }
                
                tableBody.appendChild(row);
            });
        }

        // Preenche a galeria de fotos com exemplos
        function populatePhotoGallery() {
            const gallery = document.getElementById('photoGallery');
            
            // Exemplo de imagens que estariam na pasta "img"
            const photos = [
                {name: "img/cafe1.jpg", caption: "Café da manhã completo"},
                {name: "img/cafe2.jpg", caption: "Frutas frescas"},
                {name: "img/cafe3.jpg", caption: "Pães e frios"},
                {name: "img/cafe4.jpg", caption: "Omelete especial"}
            ];
            
            photos.forEach(photo => {
                const photoContainer = document.createElement('div');
                photoContainer.className = 'photo-container';
                
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                
                // Simulação de imagem - na prática seria: <img src="img/cafe1.jpg">
                const imgPlaceholder = document.createElement('div');
                imgPlaceholder.style.width = '100%';
                imgPlaceholder.style.height = '100%';
                imgPlaceholder.style.background = 'linear-gradient(45deg, #8d6e63, #d7ccc8)';
                imgPlaceholder.style.display = 'flex';
                imgPlaceholder.style.alignItems = 'center';
                imgPlaceholder.style.justifyContent = 'center';
                imgPlaceholder.style.color = 'white';
                imgPlaceholder.style.fontWeight = 'bold';
                imgPlaceholder.textContent = photo.name;
                
                const caption = document.createElement('div');
                caption.className = 'photo-caption';
                caption.textContent = photo.caption;
                
                photoItem.appendChild(imgPlaceholder);
                photoContainer.appendChild(photoItem);
                photoContainer.appendChild(caption);
                gallery.appendChild(photoContainer);
            });
        }

        // Função para validar campos
        function validateForm() {
            let isValid = true;
            const barrelNumber = document.getElementById('barrelNumber');
            const customerName = document.getElementById('customerName');
            const deliveryTime = document.getElementById('deliveryTime');
            
            // Resetar erros
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            
            if (!barrelNumber.value.trim()) {
                barrelNumber.classList.add('error');
                document.getElementById('barrelError').style.display = 'block';
                isValid = false;
            }
            
            if (!customerName.value.trim()) {
                customerName.classList.add('error');
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            if (!deliveryTime.value.trim()) {
                deliveryTime.classList.add('error');
                document.getElementById('timeError').style.display = 'block';
                isValid = false;
            }
            
            return isValid;
        }

        // Função para atualizar a contagem total
        function updateItemCount() {
            let totalCount = 0;
            menuItems.forEach(item => {
                const itemName = item.replace(/\s+/g, '_');
                const selectedRadio = document.querySelector(`input[name="${itemName}"]:checked`);
                if (selectedRadio) {
                    totalCount += parseInt(selectedRadio.value);
                }
            });
            document.getElementById('totalCount').textContent = totalCount;
        }

        // Inicialização da página
        document.addEventListener('DOMContentLoaded', function() {
            populateItemsTable(); // Preenche a tabela de itens
            populatePhotoGallery(); // Preenche a galeria de fotos
            
            // Atualiza contagem de itens ao mudar seleções
            menuItems.forEach(item => {
                const itemName = item.replace(/\s+/g, '_');
                const radios = document.querySelectorAll(`input[name="${itemName}"]`);
                radios.forEach(radio => {
                    radio.addEventListener('change', updateItemCount);
                });
            });
            
            // Inicializa a contagem
            updateItemCount();
            
            // Envia o formulário
            document.getElementById('breakfastForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Valida campos
                if (!validateForm()) return;
                
                // Mostrar loading no botão
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
                submitBtn.disabled = true;
                
                // Simulação de envio
                setTimeout(() => {
                    alert('Pedido enviado com sucesso! Esta é uma demonstração.');
                    submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar Pedido';
                    submitBtn.disabled = false;
                }, 1500);
            });

            // Função para alternar entre as abas
            document.querySelectorAll('.tab-links').forEach(link => {
                link.addEventListener('click', function() {
                    // Remove a classe ativa de todas as abas
                    document.querySelectorAll('.tab-links').forEach(l => l.classList.remove('active'));
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

                    // Adiciona a classe ativa à aba clicada
                    this.classList.add('active');
                    const tabId = this.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });
        });