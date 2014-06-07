world-cup-api
=============
Scrapper sencillo para tener la ultima informacion del mundial de Brasil 2014

v1 
===
* Script js para scrapear en el navegador.
* json estatico con todos los partidos de la primera fase.
* API!
	* /all 		-- Todos los partidos (Incluidos los no jugados, pero estos vienen sin info de equipos)
	* /upcoming?date={date} 	-- El partido mas proximo a la fecha enviada por querystring (date es opcional)
  * /upcoming/{teamname}?date={date} -- El partido mas proximo de un equipo (date es opcional)

Proximos features
==
* API
	* /upcoming/group/{letter}