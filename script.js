// بيانات الصور
const images = [
    { src: "images/natural.jpg", category: "nature", caption: "منظر طبيعي 1" },
    { src: "images/natural2.jpg", category: "nature", caption: "منظر طبيعي 2" },
    { src: "images/city.jpg", category: "city", caption: "مدينة 1" },
    { src: "images/city1.jpg", category: "city", caption: "مدينة 2" },
    { src: "images/animal.jpg", category: "animals", caption: "حيوان 1" },
    { src: "images/animal1.jpg", category: "animals", caption: "حيوان 2" },
    { src: "images/natural1.jpg", category: "nature", caption: "منظر طبيعي 3" },
    { src: "images/city2.jpg", category: "city", caption: "مدينة 3" },
    { src: "images/animal2.jpg", category: "animals", caption: "حيوان 3" },
    { src: "images/natural3.jpg", category: "nature", caption: "منظر طبيعي 4" },
    { src: "images/city3.jpg", category: "city", caption: "مدينة 4" },
    { src: "images/animal4.jpg", category: "animals", caption: "حيوان 4" }
];

// عناصر DOM
const gallery = document.querySelector(".gallery");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const imageName = document.querySelector(".image-name");
const imageIndex = document.querySelector(".image-index");

let currentImageIndex = 0;
let filteredImages = [];

// عرض الصور في المعرض
function displayImages(filter = "all") {
    gallery.innerHTML = "";
    filteredImages = filter === "all" ? images : images.filter(img => img.category === filter);
    
    filteredImages.forEach((image, index) => {
        const imageElement = document.createElement("div");
        imageElement.className = `image ${image.category}`;
        imageElement.setAttribute("data-index", index);
        
        imageElement.innerHTML = `
            <img src="${image.src}" alt="${image.caption}">
            <div class="caption">${image.caption}</div>
        `;
        
        gallery.appendChild(imageElement);
        
        // إضافة حدث النقر للصورة
        imageElement.addEventListener("click", () => openLightbox(index));
    });
}

// فتح Lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.add("show");
}

// تحديث Lightbox
function updateLightbox() {
    const image = filteredImages[currentImageIndex];
    lightboxImg.src = image.src;
    imageName.textContent = image.caption;
    imageIndex.textContent = `${currentImageIndex + 1} / ${filteredImages.length}`;
}

// إغلاق Lightbox
closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

// الصورة التالية
nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightbox();
});

// الصورة السابقة
prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
});

// التنقل بالسهمين في الكيبورد
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;
    
    if (e.key === "ArrowRight") {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightbox();
    } else if (e.key === "ArrowLeft") {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightbox();
    } else if (e.key === "Escape") {
        lightbox.classList.remove("show");
    }
});

// تصفية الصور
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // إزالة النشط من جميع الأزرار
        filterButtons.forEach(btn => btn.classList.remove("active"));
        // إضافة النشط للزر المختار
        button.classList.add("active");
        
        const filter = button.getAttribute("data-filter");
        displayImages(filter);
    });
});

// تهيئة المعرض عند تحميل الصفحة
window.addEventListener("load", () => {
    displayImages();
});