<script>
	import Box from './utilities/Box.svelte';
</script>
<main>

	<h3 style="text-align: center;margin-bottom: 40px;">Proyecto conjunto</h3>
	<h3 style="text-align: center;margin-bottom: 40px;">para el grupo 22 de SOS</h3>
	<div class="row">
		<div class="col-6">
			<h2 style="text-align: center;margin-bottom: 40px;">Repository</h2>
			<h4 style="text-align: center;margin-bottom: 40px;"><a
					href="https://github.com/gti-sos/SOS1920-22">gti-sos/SOS1920-22</a></h4>
		</div>
		<div class="col-6">
			<h2 style="text-align: center;margin-bottom: 40px;">URL</h2>
			<h4 style="text-align: center;margin-bottom: 40px;"><a href="http://sos1920-22.herokuapp.com"
					rel="nofollow">sos1920-22.herokuapp.com</a></h4>
		</div>
	</div>
	<h2 style="text-align: center;margin-bottom: 40px;">Integraciones</h2>
	<h4 style="text-align: center;margin-bottom: 40px;"><a href="https://sos1920-22.herokuapp.com/#/integrations/"
			rel="nofollow">sos1920-22.herokuapp.com/#/integrations</a></h4>
	<div class="row">
		<div class="col-6">
			<h2 style="text-align: center;margin-bottom: 40px;">Analytics</h2>
			<h4 style="text-align: center;margin-bottom: 40px;"><a
					href="https://sos1920-22.herokuapp.com/#/analytics/">sos1920-22.herokuapp.com/#/analytics</a></h4>
		</div>
		<div class="col-6">
			<h2 style="text-align: center;margin-bottom: 40px;">About</h2>
			<h4 style="text-align: center;margin-bottom: 40px;"><a href="http://sos1920-22.herokuapp.com/#/about"
					rel="nofollow">sos1920-22.herokuapp.com/#/about</a></h4>
		</div>
	</div>
	<h2 style="text-align: center;margin-bottom: 40px;">Team</h2>
	<div style="display:flex;align-items:center;justify-content: center;margin-bottom: 40px;">
		<Box>
			<span slot="name">
				Jesús Jiménez Montero
			</span>
			<span slot="pmaddress">
				<a href="https://documenter.getpostman.com/view/10637349/SzYUXzfN" rel="nofollow">POSTMAN DE
					jesjimmon</a>
			</span>
			<span slot="apiurl">
				<a href="http://sos1920-22.herokuapp.com/api/v2/formula-stats" rel="nofollow">APIv2 formula-stats</a>
			</span>
			<span slot="apibutton">
				<button type="button" style="background: white; color:black" class="btn btn-outline-success"
					onclick="window.location.href='#/formula1API'"> API de Fórmula 1</button>
			</span>
			<span slot="chartbuttons">
				<div class="btn-group" role="group" aria-label="">
					<button type="button" class="btn btn-outline-danger" style="background: white; color:black"
						onclick="window.location.href='#/analytics/highcharts-formula-stats'"><i
							class='fas fa-leaf'></i> HighChart</button>
					<button type="button" class="btn btn-outline-success" style="background: white; color:black"
						onclick="window.location.href='#/analytics/awesome-formula-stats'"><i
							class='fas fa-leaf'></i>AwesomeChart</button>
				</div>
			</span>
		</Box>
		<Box>
			<span slot="name">
				Casto Rodríguez Díaz
			</span>
			<span slot="pmaddress">
				<a href="https://documenter.getpostman.com/view/10826099/SzYUXfdy" rel="nofollow">POSTMAN DE
					casroddia</a>
			</span>
			<span slot="apiurl">
				<a href="https://sos1920-22.herokuapp.com/api/v1/og-basket-stats/" rel="nofollow">APIv1
					og-basket-stats</a>
			</span>
			<span slot="apibutton">
				<button type="button" style="background: white; color:black" class="btn btn-outline-info"
					onclick="window.location.href='#/basketAPI'"><i class='fas fa-leaf'></i> API de Baloncesto</button>
			</span>
			<span slot="chartbuttons">
				<div class="btn-group" role="group" aria-label="">
					<button type="button" class="btn btn-outline-danger" style="background: white; color:black"
						onclick="window.location.href='#/analytics/highcharts-og-basket-stats'"><i
							class='fas fa-leaf'></i> HighChart</button>
					<button type="button" class="btn btn-outline-success" style="background: white; color:black"
						onclick="window.location.href='#/analytics/awesome-og-basket-stats'"><i
							class='fas fa-leaf'></i>AwesomeChart</button>
				</div>
			</span>
		</Box>
		<Box>
			<span slot="name">
				Juan Antonio Aranda Triana
			</span>
			<span slot="pmaddress">
				<a href="https://documenter.getpostman.com/view/10153510/SzYUXfiH" rel="nofollow">POSTMAN DE
					juaaratri</a>
			</span>
			<span slot="apiurl">
				<a href="http://sos1920-22.herokuapp.com/api/v1/swim-stats" rel="nofollow">APIv1 swim-stats</a>
			</span>
			<span slot="apibutton">
				<button type="button" style="background: white; color:black" class="btn btn-outline-danger"
					onclick="window.location.href='#/swimstatsAPI'"><i class='fas fa-leaf'></i> API de Natación</button>
			</span>
			<span slot="chartbuttons">
				<div class="btn-group" role="group" aria-label="">
					<button type="button" class="btn btn-outline-danger" style="background: white; color:black"
						onclick="window.location.href='#/analytics/highcharts-swim-stats'"><i class='fas fa-leaf'></i>
						HighChart</button>
					<button type="button" class="btn btn-outline-success" style="background: white; color:black"
						onclick="window.location.href='#/analytics/awesome-swim-stats'"><i
							class='fas fa-leaf'></i>AwesomeChart</button>
				</div>
			</span>
		</Box>
	</div>
</main>