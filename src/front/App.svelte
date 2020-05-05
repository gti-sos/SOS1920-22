<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';
	import NotFound from './NotFound.svelte';

	import Formula1 from './formula1API/App.svelte';
	import EditFormula1 from './formula1API/EditFormula1Table.svelte';

	const routes = {
		"/": Home,
		"/formula1API": Formula1,
		"/formula-stats/:country/:year": EditFormula1,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>