<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ediciones Orson - Catálogo 2026</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; }
    </style>
</head>
<body class="bg-slate-50 text-slate-900">

    <!-- Promo Banner -->
    <div class="bg-orange-500 text-white overflow-hidden py-2 border-b border-orange-600 shadow-md">
        <div class="animate-marquee">
            <div class="flex items-center gap-12 px-6 font-black uppercase text-[10px] italic tracking-widest">
                <span>Promo Verano: Llevando 2 o más libros 10% de descuento</span>
                <span>Promo Verano: Llevando 2 o más libros 10% de descuento</span>
                <span>Promo Verano: Llevando 2 o más libros 10% de descuento</span>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b px-4 h-16 flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-2">
            <div class="bg-indigo-600 p-1.5 rounded-lg shadow-lg">
                <i data-lucide="book-open" class="text-white w-5 h-5"></i>
            </div>
            <h1 class="text-xl font-black tracking-tighter text-slate-800 uppercase italic">Ediciones Orson</h1>
        </div>
        <button onclick="toggleCart()" class="relative p-2.5 bg-slate-100 rounded-2xl group">
            <i data-lucide="shopping-cart" class="text-slate-700 w-6 h-6"></i>
            <span id="badge" class="hidden absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">0</span>
        </button>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-8">
        <div class="mb-8 p-8 bg-indigo-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
            <div class="relative z-10">
                <h2 class="text-4xl font-black mb-2 uppercase italic tracking-tighter">Catálogo 2026</h2>
                <p class="text-sm opacity-80 max-w-sm font-medium leading-relaxed">Papel Ledesma Nat 75gr (B&N). <br> Demora de 5 a 10 días hábiles.</p>
            </div>
            <i data-lucide="book" class="absolute -right-10 -bottom-10 text-white/10 w-64 h-64 rotate-12"></i>
        </div>

        <!-- Buscador -->
        <div class="relative mb-12">
            <i data-lucide="search" class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6"></i>
            <input type="text" id="searchInput" oninput="render()" placeholder="Buscar título, autor o género..." 
                   class="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:border-indigo-500 shadow-sm text-lg">
        </div>

        <div id="catalog"></div>
    </main>

    <!-- Modal Carrito -->
    <div id="cartModal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onclick="toggleCart()"></div>
        <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div class="p-8 border-b flex items-center justify-between">
                <h2 class="text-2xl font-black uppercase italic tracking-tighter">Tu Pedido</h2>
                <button onclick="toggleCart()" class="p-2 bg-slate-100 rounded-xl"><i data-lucide="x"></i></button>
            </div>
            <div id="cartItems" class="flex-1 overflow-y-auto p-6 space-y-4"></div>
            <div id="cartFooter" class="p-8 border-t bg-slate-50 space-y-4 hidden">
                <div class="flex justify-between font-bold text-slate-400 uppercase text-[10px]">
                    <span>Subtotal</span>
                    <span id="subtotal">$0</span>
                </div>
                <div id="promoBox" class="hidden flex justify-between text-orange-600 font-black text-xs bg-orange-100 p-3 rounded-xl border border-orange-200">
                    <span>PROMO VERANO (10% OFF)</span>
                    <span id="discount">-$0</span>
                </div>
                <div class="flex justify-between items-end">
                    <span class="font-black text-sm uppercase">Total</span>
                    <span id="total" class="text-4xl font-black text-indigo-700 tracking-tighter">$0</span>
                </div>
                <button onclick="sendOrder()" class="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all">
                    <i data-lucide="send" class="w-5 h-5"></i> COMPRAR POR WHATSAPP
                </button>
            </div>
        </div>
    </div>

    <script>
        const books = [
            { category: "Poesía", title: "Belli Gioconda - Escandalo De Miel", price: 25000 },
            { category: "Poesía", title: "Dickinson Emily - 60 Poemas", price: 20000 },
            { category: "Poesía", title: "Pizarnik Alejandra - Poesía completa", price: 35000 },
            { category: "Narrativa", title: "Almada Selva - Chicas Muertas", price: 20000 },
            { category: "Narrativa", title: "Cortázar Julio- Rayuela", price: 35000 },
            { category: "Narrativa", title: "Enriquez Mariana- Nuestra parte de noche", price: 35000 },
            { category: "Narrativa", title: "Zambra Alejandro- Poeta chileno", price: 30000 },
            { category: "Fantástica Ficción", title: "SAGA DE LOS CONFINES completa", price: 72000 },
            { category: "Autoconocimiento", title: "Clear James-Hábitos atómicos", price: 25000 },
            { category: "Salud mental", title: "Barkley Russell A. - TDAH en la adultez", price: 25000 }
        ];

        let cart = [];

        function render() {
            const search = document.getElementById('searchInput').value.toLowerCase();
            const container = document.getElementById('catalog');
            container.innerHTML = '';

            const filtered = books.filter(b => b.title.toLowerCase().includes(search) || b.category.toLowerCase().includes(search));
            const categories = [...new Set(filtered.map(b => b.category))];
            
            categories.forEach(cat => {
                let html = `<section class="mb-10"><h2 class="text-xl font-black uppercase italic text-indigo-700 mb-6 flex items-center gap-3">${cat} <span class="h-px bg-indigo-100 flex-1"></span></h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
                filtered.filter(b => b.category === cat).forEach(b => {
                    html += `
                    <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all group">
                        <h3 class="font-bold text-slate-800 text-lg mb-4 leading-tight group-hover:text-indigo-600 transition-colors">${b.title}</h3>
                        <div class="flex justify-between items-center pt-4 border-t border-slate-50">
                            <span class="text-xl font-black text-indigo-600">$${b.price.toLocaleString('es-AR')}</span>
                            <button onclick="addToCart('${b.title.replace(/'/g, "\\'")}')" class="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs active:scale-90 transition-all shadow-md shadow-indigo-100">AGREGAR</button>
                        </div>
                    </div>`;
                });
                container.innerHTML += html + `</div></section>`;
            });
            lucide.createIcons();
        }

        function addToCart(title) {
            const book = books.find(b => b.title === title);
            const item = cart.find(i => i.title === title);
            if (item) item.quantity++; else cart.push({...book, quantity: 1});
            updateBadge();
        }

        function updateBadge() {
            const count = cart.reduce((s, i) => s + i.quantity, 0);
            const b = document.getElementById('badge');
            b.innerText = count;
            b.classList.toggle('hidden', count === 0);
        }

        function toggleCart() {
            document.getElementById('cartModal').classList.toggle('hidden');
            renderCart();
        }

        function renderCart() {
            const list = document.getElementById('cartItems');
            const footer = document.getElementById('cartFooter');
            list.innerHTML = '';
            
            if (cart.length === 0) {
                list.innerHTML = `<p class="text-center text-slate-300 py-20 font-black uppercase italic tracking-tighter">Carrito vacío</p>`;
                footer.classList.add('hidden');
                lucide.createIcons();
                return;
            }

            footer.classList.remove('hidden');
            let sub = 0; let count = 0;
            cart.forEach(item => {
                sub += (item.price * item.quantity);
                count += item.quantity;
                list.innerHTML += `
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-3">
                    <div class="flex justify-between items-start">
                        <p class="font-bold text-sm text-slate-800 leading-tight">${item.title}</p>
                        <span class="font-black text-indigo-600">$${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <div class="flex justify-end">
                        <div class="flex items-center gap-3 bg-white p-1 rounded-lg shadow-sm border">
                            <button onclick="updateQty('${item.title.replace(/'/g, "\\'")}', -1)" class="w-6 h-6 flex items-center justify-center font-bold text-red-500 hover:bg-red-50 rounded">-</button>
                            <span class="font-black text-sm w-4 text-center">${item.quantity}</span>
                            <button onclick="updateQty('${item.title.replace(/'/g, "\\'")}', 1)" class="w-6 h-6 flex items-center justify-center font-bold text-green-500 hover:bg-green-50 rounded">+</button>
                        </div>
                    </div>
                </div>`;
            });

            const disc = count >= 2 ? sub * 0.1 : 0;
            document.getElementById('subtotal').innerText = `$${sub.toLocaleString()}`;
            document.getElementById('discount').innerText = `-$${disc.toLocaleString()}`;
            document.getElementById('total').innerText = `$${(sub - disc).toLocaleString()}`;
            document.getElementById('promoBox').classList.toggle('hidden', disc === 0);
            lucide.createIcons();
        }

        function updateQty(title, delta) {
            const item = cart.find(i => i.title === title);
            if (item) {
                item.quantity += delta;
                if (item.quantity <= 0) cart = cart.filter(i => i.title !== title);
            }
            renderCart();
            updateBadge();
        }

        function sendOrder() {
            let msg = "¡Hola Ediciones Orson! Me gustaría realizar este pedido:\n\n";
            cart.forEach(i => msg += `- ${i.title} x${i.quantity}\n`);
            const sub = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
            const count = cart.reduce((s, i) => s + i.quantity, 0);
            const disc = count >= 2 ? sub * 0.1 : 0;
            if(disc > 0) msg += `\n🎁 *Promo Verano (10% OFF):* -$${disc.toLocaleString()}`;
            msg += `\n*Total a pagar: $${(sub - disc).toLocaleString()}*`;
            window.open(`https://wa.me/5493585141623?text=${encodeURIComponent(msg)}`, '_blank');
        }

        window.onload = render;
    </script>
</body>
</html>