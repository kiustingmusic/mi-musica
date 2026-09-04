# Tu página de música

## 1. Personalizar el contenido

- **Nombre y textos:** edita `index.html` — busca "Nombre Artista", el título del hero, la bio y los enlaces de contacto/redes.
- **Canciones:** pon tus archivos `.mp3` dentro de `assets/audio/` y edita la lista `tracks` al inicio de `script.js` con el título y el nombre de archivo de cada una.
- **Fotos:** pon tus imágenes dentro de `assets/img/` y edita la lista `photos` en `script.js`. También reemplaza `assets/img/bio.jpg` con tu foto de perfil.
- **Enlaces de streaming:** en `index.html`, busca la sección `stream-links` y reemplaza los `href="#"` con tus enlaces reales de Spotify, SoundCloud, etc.
- **Colores:** todos los colores están en las primeras líneas de `style.css` (bajo `:root`) — cambia `--accent` si quieres otro color principal.

## 2. Probarla en tu computadora

Abre `index.html` directamente en tu navegador (doble clic). Para probar el reproductor de audio correctamente, es mejor levantar un servidor local:

```
cd musicsite
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en el navegador.

## 3. Conseguir un dominio

Compra tu dominio (tunombre.com) en un registrador como:
- Namecheap (namecheap.com)
- Google Domains / Squarespace Domains
- GoDaddy

Cuesta aproximadamente $10–15 al año.

## 4. Hostear la página (gratis)

**Opción recomendada: Netlify**
1. Crea una cuenta en netlify.com
2. Arrastra la carpeta `musicsite` completa a la página de Netlify ("Deploy manually")
3. Netlify te da una URL gratis al instante
4. En "Domain settings" conecta el dominio que compraste, siguiendo las instrucciones que te da Netlify para apuntar los DNS

**Alternativa: GitHub Pages**
1. Sube el contenido de `musicsite` a un repositorio en GitHub
2. En Settings → Pages, activa GitHub Pages para la rama `main`
3. Conecta tu dominio propio en la misma sección

Ambas opciones son gratuitas y soportan dominio propio con HTTPS automático.
