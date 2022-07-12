<script>
    import { page } from "$app/stores";
    import Breadcrumb from "$lib/Breadcrumb.svelte";
    import TopNav from "$lib/TopNav.svelte";
    import "../app.css";
    import { theme } from "$lib/themes";
    
</script>

<div class="{ theme.backgroundColor } flex flex-col h-full">
    <TopNav {page} />
    <Breadcrumb {page} />
<slot></slot>

</div>

