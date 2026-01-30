from pathlib import Path

DIRS = [
    "apps/backend_api/tests",
    "apps/sync_service/tests",
    "apps/web/tests",
    "infra",
    "packages/connectors/tests",
    "packages/connectors/youtube",
    "packages/shared",
]


def main() -> None:
    """
    Run this from project root to generate empty folder structures
    """
    root = Path.cwd()
    for dir in DIRS:
        root.joinpath(dir).mkdir(parents=True, exist_ok=True)


if __name__ == "__main__":
    main()
