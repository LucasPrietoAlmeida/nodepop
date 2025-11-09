require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectMongoose = require('./lib/connectMongoose');

const products = [
    { name: 'MacBook Pro', owner: 'test@nodepop.com', price: 2000, tags: ['work', 'lifestyle'] },
    { name: 'Apple Watch Ultra', owner: 'test@nodepop.com', price: 950, tags: ['lifestyle', 'mobile'] },
    { name: 'Auriculares Bose QC45', owner: 'test@nodepop.com', price: 250, tags: ['lifestyle', 'work'] },
    { name: 'Cámara Sony Alpha 7 IV', owner: 'test@nodepop.com', price: 2500, tags: ['lifestyle'] },
    { name: 'Auriculares Sony WH-1000XM5', owner: 'test@nodepop.com', price: 320, tags: ['lifestyle'] },
    { name: 'Mochila Samsonite Pro-DLX', owner: 'test@nodepop.com', price: 180, tags: ['work', 'lifestyle'] },
    { name: 'Patinete Xiaomi Pro 2', owner: 'test@nodepop.com', price: 600, tags: ['motor', 'lifestyle'] },
    { name: 'Cafetera Nespresso Vertuo', owner: 'test@nodepop.com', price: 150, tags: ['lifestyle'] },
    { name: 'Smart TV LG OLED 55"', owner: 'test@nodepop.com', price: 1200, tags: ['lifestyle'] },
    { name: 'Reloj Garmin Fenix 7', owner: 'test@nodepop.com', price: 750, tags: ['lifestyle', 'work'] },
    { name: 'Dell XPS 13', owner: 'test@nodepop.com', price: 1800, tags: ['work'] },
    { name: 'Teclado mecánico Keychron K8', owner: 'test@nodepop.com', price: 120, tags: ['work'] },
    { name: 'Monitor LG UltraWide 34"', owner: 'test@nodepop.com', price: 700, tags: ['work'] },
    { name: 'Silla ergonómica Secretlab Titan Evo', owner: 'test@nodepop.com', price: 490, tags: ['work'] },
    { name: 'Disco externo Samsung T7 2TB', owner: 'test@nodepop.com', price: 160, tags: ['work', 'lifestyle'] },
    { name: 'Tableta gráfica Wacom Intuos Pro', owner: 'test@nodepop.com', price: 350, tags: ['work'] },
    { name: 'Lámpara de escritorio BenQ ScreenBar', owner: 'test@nodepop.com', price: 130, tags: ['work'] },
    { name: 'Mochila Targus Work+ 15"', owner: 'test@nodepop.com', price: 90, tags: ['work', 'lifestyle'] },
    { name: 'iPhone 13', owner: 'test@nodepop.com', price: 900, tags: ['mobile'] },
    { name: 'Samsung Galaxy S24', owner: 'test@nodepop.com', price: 850, tags: ['mobile'] },
    { name: 'Google Pixel 8', owner: 'test@nodepop.com', price: 799, tags: ['mobile'] },
    { name: 'Xiaomi 14 Pro', owner: 'test@nodepop.com', price: 899, tags: ['mobile'] },
    { name: 'OnePlus 12', owner: 'test@nodepop.com', price: 950, tags: ['mobile'] },
    { name: 'Cargador inalámbrico Belkin 3-en-1', owner: 'test@nodepop.com', price: 110, tags: ['mobile', 'lifestyle'] },
    { name: 'Funda Spigen Ultra Hybrid', owner: 'test@nodepop.com', price: 25, tags: ['mobile'] },
    { name: 'Yamaha XMAX 125', owner: 'test@nodepop.com', price: 3800, tags: ['motor'] },
    { name: 'Casco AGV K6', owner: 'test@nodepop.com', price: 480, tags: ['motor', 'lifestyle'] },
    { name: 'Guantes Dainese Carbon 4', owner: 'test@nodepop.com', price: 150, tags: ['motor'] },
    { name: 'Chaqueta Alpinestars Andes v3', owner: 'test@nodepop.com', price: 280, tags: ['motor'] },
    { name: 'Botas Rev’it! Pioneer GTX', owner: 'test@nodepop.com', price: 230, tags: ['motor', 'lifestyle'] },
    { name: 'Maleta Givi Trekker 52L', owner: 'test@nodepop.com', price: 350, tags: ['motor'] },
    { name: 'Lámpara de escritorio BenQ ScreenBar', owner: 'lucas@nodepop.com', price: 130, tags: ['work'] },
    { name: 'Mochila Targus Work+ 15"', owner: 'lucas@nodepop.com', price: 90, tags: ['work', 'lifestyle'] },
    { name: 'iPhone 13', owner: 'lucas@nodepop.com', price: 900, tags: ['mobile'] },
    { name: 'Samsung Galaxy S24', owner: 'lucas@nodepop.com', price: 850, tags: ['mobile'] },
    { name: 'Google Pixel 8', owner: 'lucas@nodepop.com', price: 799, tags: ['mobile'] },
    { name: 'Xiaomi 14 Pro', owner: 'lucas@nodepop.com', price: 899, tags: ['mobile'] },
    { name: 'OnePlus 12', owner: 'lucas@nodepop.com', price: 950, tags: ['mobile'] },
    { name: 'Cargador inalámbrico Belkin 3-en-1', owner: 'lucas@nodepop.com', price: 110, tags: ['mobile', 'lifestyle'] },
    { name: 'Funda Spigen Ultra Hybrid', owner: 'lucas@nodepop.com', price: 25, tags: ['mobile'] },
    { name: 'Yamaha XMAX 125', owner: 'lucas@nodepop.com', price: 3800, tags: ['motor'] },
    { name: 'Casco AGV K6', owner: 'lucas@nodepop.com', price: 480, tags: ['motor', 'lifestyle'] },
    { name: 'Guantes Dainese Carbon 4', owner: 'lucas@nodepop.com', price: 150, tags: ['motor'] },
    { name: 'Chaqueta Alpinestars Andes v3', owner: 'lucas@nodepop.com', price: 280, tags: ['motor'] },
    { name: 'Botas Rev’it! Pioneer GTX', owner: 'lucas@nodepop.com', price: 230, tags: ['motor', 'lifestyle'] },
    { name: 'Maleta Givi Trekker 52L', owner: 'lucas@nodepop.com', price: 350, tags: ['motor'] }
];

async function initDB() {
    await connectMongoose();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Database initialized with sample data');
    mongoose.connection.close();
}

initDB();