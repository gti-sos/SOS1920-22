<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';
	import NotFound from './NotFound.svelte';

	import Formula1 from './formula1API/App.svelte';
	import EditFormula1 from './formula1API/EditFormula1Table.svelte';

	import Nadadores from './swimstatsAPI/App.svelte';
	import EditNadador from './swimstatsAPI/EditSwimmingTable.svelte';

	import Basket from './basketAPI/App.svelte';
	import EditBasket from './basketAPI/EditBasketTable.svelte';

	//import para Analytics de la API de Fórmula 1
	import AwesomeFormula1 from "./analytics/formula1/AwesomeFormula1.svelte";
	import HighChartFormula1 from "./analytics/formula1/HighChartFormula1.svelte";

	//===AnalyticsBaloncesto===\\
	import HighChartBasketball from "./analytics/basketball/HighChartBasketball.svelte";
	import AwesomeBasketball from "./analytics/basketball/AwesomeBasketball.svelte";

	//Imports charts de Natación
	import AwesomeSwimmers from "./analytics/swimmers/AwesomeSwimmers.svelte";
	import HighChartSwimmers from "./analytics/swimmers/HighChartSwimmers.svelte";
	//Integraciones de la API de Fórmula 1
	import Integrations from "./integrations/Integrations.svelte";
	import Integration12 from "./integrations/formula1/Integration12.svelte";
	import Integration09 from "./integrations/formula1/Integration09.svelte";
	import Integration25 from "./integrations/formula1/Integration25.svelte";
	import Integration06 from "./integrations/formula1/Integration06.svelte";
	import Integration04 from "./integrations/formula1/Integration04.svelte";
	import Integration01 from "./integrations/formula1/Integration01.svelte";
	import Integration05 from "./integrations/formula1/Integration05.svelte";
	import Integration07 from "./integrations/formula1/Integration07.svelte";
	import Integration08 from "./integrations/formula1/Integration08.svelte";
	import Integration26 from "./integrations/formula1/Integration26.svelte";
	import Integration02 from "./integrations/formula1/Integration02.svelte";
	import Integration21 from "./integrations/formula1/Integration21.svelte";
	import IntegrationApiExternaOlive from "./integrations/formula1/ApiExternaOlivas.svelte";
	import IntegrationApiDigimon from "./integrations/formula1/ApiDigimon.svelte";

	//===Integraciones de la API de Baloncesto===\\
	import basketIntegration21 from "./integrations/basketball/basketIntegration21.svelte";
	import basketIntegration23 from "./integrations/basketball/basketIntegration23.svelte";
	import basketIntegration02 from "./integrations/basketball/basketIntegration02.svelte";
	import basketIntegration09 from "./integrations/basketball/basketIntegration09.svelte";
	import basketIntegration25 from "./integrations/basketball/basketIntegration25.svelte";
	import basketIntegration10 from "./integrations/basketball/basketIntegration10.svelte";
	import basketIntegration24 from "./integrations/basketball/basketIntegration24.svelte";
	import externalApiBasket from "./integrations/basketball/basketIntegrationExternalApi.svelte";
	import externalApiBasket2 from "./integrations/basketball/basketIntegrationExternalApi2.svelte";
	import externalApiBasket3 from "./integrations/basketball/basketIntegrationExternalApi3.svelte";
//	import externalApiBasket4 from "./integrations/basketball/basketIntegrationExternalApi4.svelte";
//	import externalApiBasket5 from "./integrations/basketball/basketIntegrationExternalApi5.svelte";
//	import externalApiBasket6 from "./integrations/basketball/basketIntegrationExternalApi6.svelte";
	
	//Integraciones de la API de Natación
	import swimIntegration01 from "./integrations/swimmers/swimIntegration01.svelte";
	import swimIntegration12 from "./integrations/swimmers/swimIntegration12.svelte";
	import swimIntegration05 from "./integrations/swimmers/swimIntegration05.svelte";
	import swimIntegration25 from "./integrations/swimmers/swimIntegration25.svelte";
	import swimIntegration27 from "./integrations/swimmers/swimIntegration27.svelte";
	import swimIntegration11 from "./integrations/swimmers/swimIntegration11.svelte";
	import swimIntegration28 from "./integrations/swimmers/swimIntegration28.svelte";
	import swimIntegration30 from "./integrations/swimmers/swimIntegration30.svelte";
	import swimIntegration04 from "./integrations/swimmers/swimIntegration04.svelte";
	
	import Analytics from "./analytics/Analytics.svelte"

	const routes = {
		"/": Home,
		"/formula1API": Formula1,
		"/formula-stats/:country/:year": EditFormula1,
		"/swimstatsAPI": Nadadores,
		"/swim-stats/:position": EditNadador,
		"/basketAPI": Basket,
		"/og-basket-stats/:country/:year":EditBasket,
		
		//Para entregable de gráficas

		//Esta gráfica es la de HighCharts
		"/analytics/highcharts-formula-stats": HighChartFormula1,
		//Esta gráfica es la de Awesome Charting
		"/analytics/awesome-formula-stats": AwesomeFormula1,

		//Integraciones de Fórmula 1
		"/integrations": Integrations,
		"/integrations/olive-externalApi": IntegrationApiExternaOlive,
		"/integrations/digimon": IntegrationApiDigimon,
		"/integrations/overdose-deaths": Integration12,
		"/integrations/renewable-sources-stats": Integration09,
		"/integrations/countries_for_equality_stats": Integration25,
		"/integrations/not-hospitalized-stats": Integration06,
		"/integrations/vehicles": Integration04,
		"/integrations/emigrants-stats": Integration01,
		"/integrations/health_public": Integration05,
		"/integrations/foodImports": Integration07,
		"/integrations/motogp-statistics": Integration08,
		"/integrations/goalscorers": Integration26,
		"/integrations/rural-tourism-stats-with-formula-stats": Integration02,
		"/integrations/driving-licenses": Integration21,


		//===HighChartsBaloncesto===\\
		"/analytics/highcharts-og-basket-stats": HighChartBasketball,
		//===AwesomeBaloncesto===\\
		"/analytics/awesome-og-basket-stats": AwesomeBasketball,
		//===Integraciones de Baloncesto===\\
		"/integrations/traffic-injuries": basketIntegration21,
		"/integrations/offworks-stats": basketIntegration23,
		"/integrations/rural-tourism-stats": basketIntegration02,
		"/integrations/oil-coal-nuclear-energy-consumption-stats": basketIntegration09,
		"/integrations/happiness_rate": basketIntegration25,
		"/integrations/global-suicides": basketIntegration10,
		"/integrations/atc-stats": basketIntegration24,
		//===Api externa===\\
		"/integrations/nbarapidapi": externalApiBasket,
		"/integrations/videogamesrapidapi": externalApiBasket2,
		"/integrations/coronavirusindia": externalApiBasket3,
//		"/integrations/externalApiBasket4": externalApiBasket4,
//		"/integrations/externalApiBasket5": externalApiBasket5,
//		"/integrations/externalApiBasket6": externalApiBasket6,
		
		
		//HighChart Natación
		"/analytics/highcharts-swim-stats": HighChartSwimmers,
		//AwesomeChart Natación
		"/analytics/awesomechart-swim-stats": AwesomeSwimmers,
		//Integraciones Natación
		"/integrations/poverty-stats01": swimIntegration01,
		"/integrations/drug_offences": swimIntegration12,
		"/integrations/books-exports": swimIntegration05,
		"/integrations/global_competitiveness_index": swimIntegration25,
		"/integrations/poverty-stats27": swimIntegration27,
		"/integrations/economic-freedom-indexes": swimIntegration11,
		"/integrations/ppas": swimIntegration28,
		"/integrations/sugarconsume": swimIntegration30,
		"/integrations/traffic_accidents": swimIntegration04,


		//Esta es la gráfica común de los 3 miembros del grupo.
		"/analytics": Analytics,

		"*": NotFound


	};
</script>

<main>
	<Router {routes} />
</main>