from .analytics import router as analytics_router
from .auth import router as auth_router
from .history import router as history_router
from .report import router as report_router
from .preferences import router as preferences_router
from .export import router as export_router
from .dish_analysis import router as dish_analysis_router

__all__ = [
    'analytics_router',
    'auth_router',
    'history_router',
    'report_router',
    'preferences_router',
    'export_router',
    'dish_analysis_router'
]