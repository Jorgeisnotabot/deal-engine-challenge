# Deal Engine - Reto Técnico

El sistema consta de un backend y frontend donde se realiza el
procesamiento del dataset en csv por lotes de 30 para evitar
llegar al limite del nivel gratis de la API de OpenWeather:

La lógica principal consiste en dividir la lista de tickets en lotes y, para cada lote, solicitar los datos meteorológicos correspondientes. Esto asegura que la aplicación no se sobrecargue al procesar demasiados tickets de una sola vez.

es necesario un env file a nivel raíz con la env variable de:
OPENWEATHER_API_KEY



