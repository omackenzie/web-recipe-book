<script>
	export let label;
	export let name;
	export let required = false;
	export let multiline = false;
	export let placeholder = '';
	export let bindValue = null;
</script>

<label class="block mt-6" for={name}
	>{label}
	{#if required}
		<span class="text-red-600 text-lg">*</span>
	{/if}
</label>
{#if multiline}
	<textarea
		class="w-full px-3 py-2 mt-2 border-2 rounded"
		type="text"
		rows="4"
		{name}
		{placeholder}
		id={name}
		bind:value={bindValue}
	/>
{:else}
	<input
		class="w-full h-12 px-4 mt-2 border-2 rounded"
		type="text"
		{name}
		{placeholder}
		id={name}
		bind:value={bindValue}
	/>
{/if}
