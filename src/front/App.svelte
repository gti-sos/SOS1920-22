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

	//Integraciones de la API de Fórmula 1
	import Integrations from "./integrations/Integrations.svelte";
	import IntegrationOverdoseDeaths from "./integrations/formula1/IntegrationOverdoseDeaths.svelte";
	import Integration09 from "./integrations/formula1/Integration09.svelte";

	

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
		"/integrations/overdose-deaths": IntegrationOverdoseDeaths,
		"/integrations/renewable-sources-stats": Integration09,

		//===HighChartsBaloncesto===\\
		"/analytics/highcharts-og-basket-stats": HighChartBasketball,

		//Esta es la gráfica común de los 3 miembros del grupo.
		"/analytics": Analytics,

		"*": NotFound


	};
</script>

<main>
	<Router {routes} />
</main>