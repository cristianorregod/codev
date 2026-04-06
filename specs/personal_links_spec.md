# **Especificaciones Técnicas: Página de Enlaces Dinámica (Estilo Linktree)**

## **1\. Descripción General**

El objetivo de esta funcionalidad es proporcionar una página de aterrizaje (landing page) optimizada para dispositivos móviles que centralice enlaces externos, redes sociales y recursos específicos bajo una estética moderna y minimalista.

## **2\. Características Principales**

* **Diseño Glassmorphism:** Interfaz basada en transparencias y desenfoque de fondo (*backdrop-filter*).  
* **Carga Dinámica:** Los datos se consumen desde un archivo data.json, permitiendo actualizaciones sin modificar el código HTML.  
* **Sistema de Acordeones:** Capacidad de agrupar múltiples sub-enlaces bajo un título común para mejorar la organización visual.  
* **Responsive Design:** Optimizado para visualización en smartphones (prioridad alta) y escritorio.  
* **Skeleton Loading:** Indicadores de carga visual para mejorar la percepción de velocidad del usuario.  
* **Compartir Perfil:** Botón funcional para copiar la URL actual al portapapeles.

## **3\. Arquitectura Técnica**

* **Frontend:** React.js, CSS3 (vía Tailwind CSS).  
* **Estilos:** Utiliza la librería **Tailwind CSS** para un diseño rápido y responsivo.  
* **Manejo de Datos:** Estructura de datos desacoplada en formato JSON.

## **4\. Estructura del Archivo de Datos (links.json)**

El archivo JSON se divide en dos secciones principales: perfil y secciones.

### **4.1. Objeto perfil**

Contiene la información de identidad del usuario.

* nombre: Nombre de usuario o marca (ej: "@TuUsuario").  
* bio: Breve descripción o subtítulo.  
* avatar: URL de la imagen de perfil.  
* redes: Lista de objetos con plataforma (instagram, twitter, github) y url.

### **4.2. Array secciones**

Define los botones o grupos de enlaces. Cada objeto dentro de la lista debe tener:

* id: Identificador único (usado para la lógica de apertura de acordeones).  
* tipo: Puede ser "simple" (un solo link) o "acordeon" (lista desplegable).  
* titulo: Texto principal del botón.  
* icono: Emoji o símbolo representativo.  
* url: (Solo para tipo *simple*) Dirección de destino.  
* items: (Solo para tipo *acordeon*) Lista de objetos con etiqueta y url.

## **5\. Lógica de Interacción**

### **5.1. Acordeones**

Al hacer clic en una sección de tipo acordeón, se ejecuta la función toggleAccordion(id):

1. Verifica si la sección ya está abierta.  
2. Cierra cualquier otro acordeón abierto (modo enfoque único).  
3. Utiliza transiciones de CSS Grid (grid-template-rows) para una animación fluida de 0 a 1 unidad de fracción.

### **5.2. Copiado de Enlace**

Utiliza un elemento temporal de texto (textarea) para ejecutar el comando copy en el documento, asegurando compatibilidad con navegadores móviles que restringen el acceso directo al portapapeles por seguridad.

## **6\. Guía de Personalización**

* **Colores:** Se pueden modificar los gradientes del fondo en la propiedad background del body.  
* **Iconos:** La función renderApp mapea las plataformas de redes sociales a SVGs específicos. Para añadir nuevas redes, se debe incluir el SVG en el diccionario icons dentro del script.  
* **Tiempo de Carga:** El sistema incluye un retraso simulado (setTimeout) para demostrar el efecto *skeleton*, el cual debe ser removido o ajustado al conectar con una API real.

## **7\. Mantenimiento**

Para añadir nuevos enlaces, simplemente edite el archivo data.json. No es necesario realizar despliegues de código a menos que se requiera cambiar la estructura visual o añadir nuevos tipos de componentes.