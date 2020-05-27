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
	import AwesomeBasketball from "./analytics/basketball/HighChartBasketball.svelte";

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
		"/integrations/rural-tourism-stats": Integration02,
		"/integrations/driving-licenses": Integration21,


		//===HighChartsBaloncesto===\\
		"/analytics/highcharts-og-basket-stats": HighChartBasketball,
		"/analytics/awesome-og-basket-stats": AwesomeBasketball,
		

		//Esta es la gráfica común de los 3 miembros del grupo.
		"/analytics": Analytics,

		"*": NotFound


	};
</script>

<main>
	<Router {routes} />
</main>