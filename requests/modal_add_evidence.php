<div class="modal fade" id="modal-add-evidence-request" tabindex="-1" style="display: none;" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalCenterTitle"> <i class="fas fa-arrow-trend-up"></i> Agregar Avance</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="form-add-evidence">
            <div class="modal-body">
                <div class="row">

                    <div class="col-12">
                        <label for="descripcion" class="form-label">Mensaje</label>
                        <textarea name="mensaje" required class="form-control" placeholder="Añade una descripcion de la evidencia..." style="height: 100px"></textarea>
                    </div>
                    
                    <div class="col-12">
                        <label for="descripcion" class="form-label">Adjunto</label>
                        <input type="file" name="nombre_archivo" id="nombre_archivo" accept="image/*,application/pdf" required class="form-control">
                    </div>
                    

                    <input type="hidden" name="solicitud_id" value="0">  
                    <input type="hidden" name="solicitud_oferta_id" value="0">  

                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary"> <i class="fas fa-bookmark"></i> Crear</button>
            </div>
            </form> 
        </div>
    </div>
</div>