# SOAP y REST Wallet API

Este proyecto es una API basada en SOAP y REST para gestionar una billetera electrónica. El sistema permite registrar clientes, recargar saldo en la billetera, realizar compras con confirmación de token y consultar el saldo de un cliente.

## Introducción

Esta API está desarrollada con Node.js, MySQL, TypeORM y utiliza SOAP para la comunicación entre cliente y servidor. Se proporcionan servicios como el registro de clientes, la recarga de billetera, el pago de compras con un token de confirmación y la consulta de saldo.

## Requisitos previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

- Node.js (v18 o superior)
- MySQL (v5.7 o superior)
- SOAP (SOAP UI o POSTMAN u otra herramienta de **prueba**)
- Git

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/megalcastro/back-soap-wallet.git
   cd tu_proyecto
``

2. Instala las dependencias del proyecto:
   ``` npm install ```

3. Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno (ver la sección de Variables de entorno).

## Variables de entorno

A continuación, se detallan las variables de entorno necesarias para la ejecución del proyecto. Asegúrate de incluirlas en un archivo .env en la raíz del proyecto.


DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=app_wallet
EMAIL_USER= tu_email@gmail.com
EMAIL_PASS= tu_contraseña_email



## como generar un contraseña para gmail ? 
- [ver aqui](https://siigopyme.portaldeclientes.siigo.com/basedeconocimiento/generar-contrasenas-aplicaciones-google/)

---


1. Asegúrate de tener la base de datos configurada. Puedes usar el script de inicialización de la base de datos proporcionado.

 - `npm run create-database`

5. Inicia el servidor:

    `npm run start`

## Endpoints del Servicio SOAP
#### registroCliente Registra un cliente en el sistema.

**Parámetros**:

documento: Número de documento del cliente.
nombres: Nombre completo del cliente.
email: Dirección de correo electrónico.
celular: Número de celular del cliente.
Respuesta:

**success**: true si el registro es exitoso, false si falla.
cod_error: Código de error (00 éxito, 01 error).
**message_error**: Mensaje de error en caso de fallo.


-  consultarSaldo Consulta el saldo disponible de un cliente.

**Parámetros**:

**documento**: Número de documento del cliente.
**celular**: Número de celular del cliente.
Respuesta:

**saldo**: El saldo disponible del cliente.
  
  #### recargarBilletera
Recarga la billetera del cliente con un valor determinado.

**Parámetros**:

documento: Número de documento del cliente.
celular: Número de celular del cliente.
valor: Monto a recargar.
Respuesta:

mensaje: Mensaje de confirmación.
saldo: Nuevo saldo del cliente.

#### pagarCompra
Realiza un pago utilizando el saldo de la billetera y genera un token de confirmación.

**Parámetros**:

**documento**: Número de documento del cliente.
**celular**: Número de celular del cliente.
**monto**: Monto de la compra.
Respuesta:

- mensaje: Confirmación del envío de correo con el token.
sessionId: ID de la sesión para confirmar la compra.

#### confirmarCompra
Confirma la compra utilizando el token de confirmación.

**Parámetros**:

**sessionId**: ID de la sesión de compra.
**token**: Token de confirmación enviado al correo.

**Respuesta**:

- mensaje: Confirmación de la compra y actualización del saldo.