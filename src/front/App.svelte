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

	const routes = {
		"/": Home,
		"/formula1API": Formula1,
		"/formula-stats/:country/:year": EditFormula1,
		"/swimstatsAPI": Nadadores,
		"/swim-stats/:position": EditNadador,
		"/basketAPI": Basket,
		"/og-basket-stats/:country/:year":EditBasket,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>