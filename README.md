# Jelpifai

**Aplicación web + API REST**

## 🚀 Descripción
Jelpifai es la aplicación web principal del proyecto y está acompañada por una API REST. Este repositorio contiene el frontend (PHP, JS, assets) y la integración con la API.

## 🔗 Despliegues
- **App (Frontend):** https://jelpifai.sievensoft.com/
- **API (endpoint de ejemplo):** https://rest-server-jelpifai.vercel.app/api/v1
- **Documentación de la API:** https://jelpifai.sievensoft.com/docs-api.html

> ⚠️ Nota: Verifica las rutas y credenciales en tu entorno local antes de conectar con los despliegues.

## 🧰 Tecnologías
- PHP
- JavaScript
- CSS
- Bootstrap y librerías de terceros (ver `libs/`)
- Base de datos PostgreSql

## 📁 Estructura principal
- `assets/` — CSS, JS, imágenes y vendor
- `dashboard/` — panel administrativo
- `html/` — plantillas y páginas de ejemplo
- `js/` — scripts del lado cliente
- `php/` — helpers y utilidades PHP
- `requests/` — endpoints y vistas relacionadas a solicitudes

## ⚙️ Requisitos
- Servidor web (Apache / Nginx) con PHP instalado (recomendada versión >= 7.4)
- Base de datos PostgreSql (si aplica)
- Composer (si usas dependencias PHP) y Node.js/npm (si compilas assets)

## 📥 Instalación local (ejemplo)
1. Clonar el repositorio:
   ```bash
   git clone <REPO_URL>
   cd app-jelpifai
   ```
2. Configurar la base de datos y credenciales (crear `config.php` o ajustar variables de entorno según tu setup).
3. Importar el dump SQL si existe y actualizar la configuración.
4. Levantar el servidor local (opción rápida):
   ```bash
   php -S localhost:8000 -t .
   ```
   O configurar un VirtualHost en Apache/Nginx.

> 💡 Ajusta los pasos anteriores según la configuración real del proyecto (archivos de configuración, scripts de migración, etc.).
<!-- 
## 📚 Documentación
Puedes ver la documentación de la API en: `docs-api.html` o en la URL de despliegue indicada arriba.

## 🤝 Contribuir
1. Hacer un fork.
2. Crear una rama con tu feature: `git checkout -b feature/nombre-feature`.
3. Hacer PR con descripción clara de cambios.

## 📜 Licencia
Licencia: **MIT** (actualizar según corresponda).

## ✉️ Contacto
Para preguntas o soporte interno, añade tus datos de contacto aquí.

---
*README generado automáticamente. Actualiza las secciones de configuración, pasos de instalación y licencia según la configuración real del proyecto.* -->