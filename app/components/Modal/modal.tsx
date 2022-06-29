
export default Modal() {
    return(
        <>
        <details>
          <summary>
            <div class="button">
              Show me the modal
            </div>
            <div class="details-modal-overlay"></div>
          </summary>
          <div class="details-modal">
            <div class="details-modal-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="black" />
              </svg>
            </div>
            <div class="details-modal-title">
              <h1>Add product</h1>
            </div>
            <div class="details-modal-content">
              
              <div class="custom-row" style="display: flex; flex-direction: row; ">
              <div class="col-3 input-effect">
                <input class="effect-19" id="productQ" type="text" placeholder="">
                  <label>Quantity</label>
                  <span class="focus-border">
                    <i></i>
                  </span>
              </div>

              <div class="col-3 input-effect">
                  <select class="effect-19" name="productstype" id="productT" aria-placeholder="">
                    <option style="height: 100%;" value="" disabled selected>Select the product</option>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                  </select>
                  <span class="focus-border">
                    <i></i>
                  </span>
              </div>
            </div>

              <div class="col-md-12">
                <button class="button-3">Cancel</button>
                <button class="button-4">Save</button>
            </div>
          </div>
        </details>
      </div>
        </>
    )
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}