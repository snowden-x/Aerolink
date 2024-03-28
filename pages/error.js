export default function showError(element, msg="An Error Occured") {
    $('#top').hide();
    $('#aloplane').hide();
    element.html(`
        <div class="error_container">
            <img src="/not-found.svg" alt="not found illustration">
            <p class="error_text">${msg}</p>
        </div>
    `)
}