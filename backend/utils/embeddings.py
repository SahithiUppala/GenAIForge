from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List

# Load the embedding model (lightweight and efficient)
model = SentenceTransformer('all-MiniLM-L6-v2')


def generate_embedding(text: str) -> List[float]:
    """Generate embedding vector for a given text"""
    if not text or not text.strip():
        return []
    embedding = model.encode(text, convert_to_numpy=True)
    return embedding.tolist()


def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """Calculate cosine similarity between two vectors"""
    if not vec1 or not vec2:
        return 0.0
    
    vec1_np = np.array(vec1)
    vec2_np = np.array(vec2)
    
    dot_product = np.dot(vec1_np, vec2_np)
    norm1 = np.linalg.norm(vec1_np)
    norm2 = np.linalg.norm(vec2_np)
    
    if norm1 == 0 or norm2 == 0:
        return 0.0
    
    return float(dot_product / (norm1 * norm2))


def find_similar_papers(query_embedding: List[float], papers_with_embeddings: List[dict], top_k: int = 5) -> List[dict]:
    """Find most similar papers based on embedding similarity"""
    if not query_embedding:
        return []
    
    similarities = []
    for paper in papers_with_embeddings:
        if paper.get('embedding'):
            similarity = cosine_similarity(query_embedding, paper['embedding'])
            similarities.append({
                'paper': paper,
                'similarity': similarity
            })
    
    # Sort by similarity score
    similarities.sort(key=lambda x: x['similarity'], reverse=True)
    
    return [item['paper'] for item in similarities[:top_k]]
