# Script para organizar videos por categoría
$rutaVideos = "Assets\Rotacion.mp4"
$carpetaDestino = "Assets\videos"
# Definir la organización de videos por categoría
$organizacion = @{
    "carbohidratos" = @("Avena.mp4", "Arroz.mp4", "Fideos.mp4", "Cereal ‐ Hecho con Clipchamp.mp4", "Cous Cous ‐ Hecho con Clipchamp.mp4", "Garbanzos ‐ Hecho con Clipchamp.mp4")
    "verduras" = @("Apio ‐ Hecho con Clipchamp.mp4", "Berenjena.mp4", "Brocoli.mp4", "Calabaza ‐ Hecho con Clipchamp.mp4", "Cebolla.mp4", "Espinaca.mp4", "Hongo ‐ Hecho con Clipchamp.mp4", "Lechuga.mp4")
    "proteinas" = @("Atun ‐ Hecho con Clipchamp.mp4", "Camaron ‐ Hecho con Clipchamp.mp4", "Carne.mp4", "Cerdo.mp4", "Huevo ‐ Hecho con Clipchamp.mp4", "Jamon ‐ Hecho con Clipchamp.mp4")
    "frutas" = @("Anana ‐ Hecho con Clipchamp.mp4", "Banana ‐ Hecho con Clipchamp.mp4", "Ciruela ‐ Hecho con Clipchamp.mp4", "Durazno ‐ Hecho con Clipchamp.mp4", "Frutilla ‐ Hecho con Clipchamp.mp4", "Kiwi.mp4")
    "condimentos" = @("Aceite de oliva ‐ Hecho con Clipchamp.mp4", "Ajo en polvo.mp4", "Ketchup ‐ Hecho con Clipchamp.mp4")
}

Write-Host "Iniciando organización de videos..." -ForegroundColor Green

foreach ($categoria in $organizacion.GetEnumerator()) {
    $nombreCategoria = $categoria.Key
    $carpetaDestinoCategoria = Join-Path $carpetaDestino $nombreCategoria
    
    foreach ($video in $categoria.Value) {
        $rutaOrigen = Join-Path $rutaVideos $video
        $rutaDestino = Join-Path $carpetaDestinoCategoria $video
        
        if (Test-Path $rutaOrigen) {
            Copy-Item -Path $rutaOrigen -Destination $rutaDestino -Force
            Write-Host "Copiado: $video -> $nombreCategoria" -ForegroundColor Cyan
        } else {
            Write-Host "No encontrado: $video" -ForegroundColor Red
        }
    }
}

Write-Host "Organización completada!" -ForegroundColor Green
