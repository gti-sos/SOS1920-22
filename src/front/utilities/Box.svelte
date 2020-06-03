<style>
	.box {
		width: 400px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
		background-image: linear-gradient(45deg, #66a4c0 50%, transparent 50%);
		background-position: 100%;
		background-size: 400%;
		transition: background 300ms ease-in-out;
	}
	.box:hover {
		background-position: 0;
		color: #000;
	}

	h3 {
        text-align: center;
		padding: 0 0 0.2em 0;
		margin: 0 0 1em 0;
		border-bottom: 1px solid #000000
	}

	.pmaddress {
        position: relative;
		padding: 0 0 0 1.5em;
		background:  0 0 no-repeat;
		background-size: 15px 15px;
		margin: 0 0 0.5em 0;
        line-height: 1.2;
        left:85px;
    }
    .apiurl {
        position: relative;
        padding: 0 0 0 1.5em;
		background:  0 0 no-repeat;
		background-size: 20px 20px;
		margin: 0 0 0.5em 0;
        line-height: 1.2;
        left:105px;
    }
    .apibutton, .chartbuttons {
        text-align: center;
		margin-top: 20px;
    }

	.pmaddress { background-image: url('https://www.postman.com/icons/icon-48x48.png?v=9a2f6f2a305951852f949fcec9a89efd') }
	.apiurl   { background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/87/VisualEditor_-_Icon_-_Code.svg') }
	.missing { color: #999 }
</style>

<article class="box">
	<h3>
		<slot name="name">
			<span class="missing">Unknown name</span>
		</slot>
	</h3>

	<div class="pmaddress">
		<slot name="pmaddress">
			<span class="missing">Unknown address</span>
		</slot>
	</div>

	<div class="apiurl">
		<slot name="apiurl">
			<span class="missing">Unknown email</span>
		</slot>
    </div>
    <div class="apibutton">
        <slot name="apibutton">
            <button type="button"></button>
        </slot>
	</div>
	<div class="chartbuttons">
		<slot name="chartbuttons">
			<div class="btn-group" role="group" aria-label="">
				<button type="button" class="btn btn-danger">HighChart</button>
				<button type="button" class="btn btn-success">AwesomeChart</button>
			</div>
		</slot>
	</div>
</article>