<script>
	import Fa from 'svelte-fa';
	import { faHome } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="flex justify-between items-center py-4 px-10 bg-black text-white">
	<a href="/">
		<Fa icon={faHome} size="2x" />
	</a>
	<a class="font-bold" href="/submit">Submit a Recipe</a>
</div>
