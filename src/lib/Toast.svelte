<script>
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifications } from "./notifications";

    export let themes = {
        danger: "bg-red-500",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        info: "bg-purple-500",
        default: "bg-purple-500",
    };
</script>

<div class="notifications">
    {#each $notifications as notification (notification.id)}
        <div
            animate:flip
            class="toast {themes[notification.type]} rounded shadow-lg"
 
            transition:fly={{ y: 30 }}
        >
            <div class="content">{notification.message}</div>
            {#if notification.icon}<i class={notification.icon} />{/if}
        </div>
    {/each}
</div>

<style>
    .notifications {
        position: fixed;
        top: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        pointer-events: none;
    }

    .toast {
        flex: 0 0 auto;
        margin-bottom: 10px;
    }

    .content {
        padding: 10px;
        display: block;
        color: white;
        font-weight: 500;
    }
</style>
