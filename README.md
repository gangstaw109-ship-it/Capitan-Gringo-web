# Capitán Gringo Tours

Sitio web oficial de excursiones de **Capitán Gringo / Coligrin Tours** en República Dominicana.

Incluye el catálogo completo de excursiones, páginas individuales, destinos, galería, información de la empresa y reserva directa por WhatsApp. La experiencia está optimizada para móviles y permite traducir automáticamente el contenido a varios idiomas.

## Tecnología

- React 19
- Next.js 16
- Vite y vinext
- TypeScript
- Cloudflare Workers

## Ejecutar en Windows

La forma más sencilla es hacer doble clic en:

`INICIAR_WEB.bat`

La página se abrirá en:

`http://localhost:5173`

Para detenerla, utilice `DETENER_WEB.bat`.

## Desarrollo

Requiere Node.js 22.13 o una versión posterior.

```bash
npm install
npm run dev
```

Comprobaciones disponibles:

```bash
npm run build
npm test
npm run lint
```

## Organización

- `app/`: páginas, componentes y estilos.
- `app/content/site.ts`: excursiones, precios, contacto y contenido comercial.
- `public/images/`: fotografías y logotipos optimizados.
- `public/fonts/garet/`: ubicación preparada para los archivos oficiales de Garet.
- `tests/`: comprobaciones automáticas del sitio.
- `worker/`: entrada compatible con Cloudflare Workers.
- `.openai/hosting.json`: configuración lógica de alojamiento.

## Idiomas

El contenido original está en español. El selector admite español, inglés, portugués, alemán, francés e italiano mediante traducción automática de Google, por lo que esta función requiere conexión a Internet.

## Publicación

El repositorio está preparado para instalarse con `npm ci` y compilarse con `npm run build`. La configuración actual produce una aplicación compatible con Cloudflare Workers; no es una página estática para GitHub Pages.

La automatización de GitHub comprueba cada cambio mediante el archivo `.github/workflows/ci.yml`.

Para instrucciones sencillas de edición, consulte `INSTRUCCIONES_WEB.txt`. Para subir esta carpeta a GitHub, consulte `GITHUB_INSTRUCCIONES.txt`.

## Licencia

El código, contenido, fotografías e identidad visual pertenecen a Capitán Gringo / Coligrin Tours. No se incluye una licencia de reutilización pública.
