# Servidor de RUCs y adicionales

Proyecto en express para consulta de RUCs diseñado para Perú. También hace consulta de Tipo de cambio y porcentajes de AFP.

## Motivación

Si bien hay muchos clientes que a través del uso de **Tesseract** pueden acceder a la base de datos de RUCs de SUNAT, este sitio no está siempre disponible, suele tener constantes caídas y otros problemas, por lo que se tuvo que adoptar otra estrategia.
Todos los días, SUNAT publica el **Padrón Reducido** que es justamente dicha información, en la siguiente URL:

- [http://www.sunat.gob.pe/descargaPRR/mrc137_padron_reducido.html](http://www.sunat.gob.pe/descargaPRR/mrc137_padron_reducido.html)

## Requerimientos

- MongoDB (3.6 o superior)
- Espacio en disco de al menos 10GB

## Instalación

Solamente necesitaremos clonar el repositorio y ejecutar el comando de instalación:

```
npm install
```

## Sincronización de RUCS

La sincronización se realizará automáticamente cada día a las 2 a.m. En caso se necesite modificar este comportamiento, se debe modificar el archivo **cron/index.js**.

## Uso

```
<GET> http://localhost:5000/api/ruc/20131312955
```

## Rutas adicionales

### Consulta de Tipo de Cambio SUNAT

```
<GET> http://localhost:5000/api/tc
```

### Consulta de Porcentajes AFP

```
<GET> http://localhost:5000/api/afp
```
