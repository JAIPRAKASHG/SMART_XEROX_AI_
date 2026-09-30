import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from document_analyzer import analyzer

app = FastAPI(
    title="SmartPrint AI Microservice",
    description="Microservice for document classification, page extraction, and print suitability analysis",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEMP_DIR = "/tmp/smartprint_ai" if os.name != "nt" else "C:\\temp\\smartprint_ai"
os.makedirs(TEMP_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {
        "service": "SmartPrint AI Microservice",
        "status": "online",
        "engine": "OCR + Document Classifier",
        "gemini_ready": bool(analyzer.gemini_model)
    }

@app.post("/analyze")
async def analyze_uploaded_document(file: UploadFile = File(...)):
    """
    Receives document file, performs classification, page extraction,
    and returns print suitability score.
    """
    try:
        temp_file_path = os.path.join(TEMP_DIR, file.filename)
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = analyzer.analyze_document(temp_file_path, file.filename)
        return {"success": True, "analysis": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
