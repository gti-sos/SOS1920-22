<script>
	import Box from './utilities/Box.svelte';
</script>
<main>

	<h2 style="text-align: center;margin-bottom: 40px;">Project description</h2>
	<h6 style="text-align: center;margin-bottom: 40px;">The sources of information chosen are aimed at analyzing the relationship between the classification of:</h6>
	<div style="text-align: center;">
		<ul style="position: relative;
		display:inline-block;">
			<p><strong>Formula 1 drivers by nationality</strong></p>
			<p><strong>Teams that lost the final game in Olympic basketball history</strong></p>
			<p><strong>The swimming world records</strong></p>
		</ul>
	</div>
	<h2 style="text-align: center;margin-bottom: 40px;">Repository</h2>
	<h4 style="text-align: center;margin-bottom: 40px;"><a href="https://github.com/gti-sos/SOS1920-22">gti-sos/SOS1920-22</a></h4>
	<h2 style="text-align: center;margin-bottom: 40px;">URL</h2>
	<h4 style="text-align: center;margin-bottom: 40px;"><a href="http://sos1920-22.herokuapp.com" rel="nofollow">http://sos1920-22.herokuapp.com</a></h4>
	<h2 style="text-align: center;margin-bottom: 40px;">Team</h2>
	<div style="display:flex;align-items:center;justify-content: center;margin-bottom: 40px;">
	<Box>
		<span slot="name">
			Jesús Jiménez Montero
		</span>
		<span slot="pmaddress">
			<a href="https://documenter.getpostman.com/view/10637349/SzYUXzfN" rel="nofollow">POSTMAN DE jesjimmon</a>
		</span>
		<span slot="apiurl">
			<a href="http://sos1920-22.herokuapp.com/api/v2/formula-stats" rel="nofollow">APIv2 formula-stats</a>
		</span>
		<span slot="apibutton">
			<button type="button" style="background: white; color:black" class="btn btn-outline-success"  onclick="window.location.href='#/formula1API'"> API de Fórmula 1</button>
		</span>
	</Box>
	<Box>
		<span slot="name">
			Casto Rodríguez	Díaz
		</span>
		<span slot="pmaddress">
			<a href="https://documenter.getpostman.com/view/10826099/SzYUXfdy" rel="nofollow">POSTMAN DE casroddia</a>
		</span>
		<span slot="apiurl">
			<a href="https://sos1920-22.herokuapp.com/api/v1/og-basket-stats/" rel="nofollow">APIv1 swim-stats</a>
		</span>
		<span slot="apibutton">
			<button type="button" style="background: white; color:black" class="btn btn-outline-info"  onclick="window.location.href='#/basketAPI'"><i class='fas fa-leaf' ></i> API de Baloncesto</button>
		</span>
	</Box>
	<Box>
		<span slot="name">
			Juan Antonio Aranda Triana
		</span>
		<span slot="pmaddress">
			<a href="https://documenter.getpostman.com/view/10153510/SzYUXfiH" rel="nofollow">POSTMAN DE juaaratri</a>
		</span>
		<span slot="apiurl">
			<a href="http://sos1920-22.herokuapp.com/api/v1/swim-stats" rel="nofollow">APIv1 swim-stats</a>
		</span>
		<span slot="apibutton">
			<button type="button" style="background: white; color:black" class="btn btn-outline-danger"  onclick="window.location.href='#/swimstatsAPI'"><i class='fas fa-leaf' ></i> API de Natación</button>
		</span>
	</Box>

	</div>
</main>