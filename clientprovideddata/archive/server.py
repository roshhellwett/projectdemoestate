#!/usr/bin/env python
"""SS Property — local development server.
Serves the flagship web app at /app (or / as default redirect),
serves media assets seamlessly from clientprovideddata/cloned_website/media,
and preserves the archived clone at /cloned_website/.

Usage:
  python server.py            # normal mode
  python server.py --offline  # strict offline mode
"""
import http.server
import socketserver
import os
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = 8123
OFFLINE = '--offline' in sys.argv

MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json',
    '.woff2': 'font/woff2',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.txt': 'text/plain; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def log_message(self, fmt, *args):
        sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), fmt % args))

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_HEAD(self):
        self._dispatch(head_only=True)

    def do_GET(self):
        self._dispatch(head_only=False)

    def _dispatch(self, head_only=False):
        path = urllib.parse.unquote(self.path.split('?')[0])

        # ---- Root route ----
        if path == '' or path == '/':
            root_index = os.path.join(ROOT, 'index.html')
            if os.path.isfile(root_index):
                return self.serve_file(root_index, head_only)
            # Default redirect to /app/ until new root site is deployed
            self.send_response(302)
            self.send_header('Location', '/app/')
            self.end_headers()
            return

        # ---- /app mount: the flagship UI ----
        if path == '/app' or path == '/app/':
            return self.serve_file(os.path.join(ROOT, 'app', 'index.html'), head_only)
        if path.startswith('/app/'):
            rel = path[len('/app/'):]
            full = os.path.normpath(os.path.join(ROOT, 'app', rel.replace('/', os.sep)))
            if os.path.isfile(full):
                return self.serve_file(full, head_only)
            # SPA fallback for any /app/* deep link
            return self.serve_file(os.path.join(ROOT, 'app', 'index.html'), head_only)

        # ---- /media route: serve from clientprovideddata/cloned_website/media or app/media ----
        if path.startswith('/media/'):
            rel = path[len('/media/'):].replace('/', os.sep)
            candidates = [
                os.path.join(ROOT, 'clientprovideddata', 'cloned_website', 'media', rel),
                os.path.join(ROOT, 'app', 'media', rel),
                os.path.join(ROOT, 'media', rel),
            ]
            for cand in candidates:
                norm = os.path.normpath(cand)
                if os.path.isfile(norm):
                    return self.serve_file(norm, head_only)
            self.send_error(404)
            return

        # ---- /_astro, /parastorage, /__offline__: serve from clientprovideddata/cloned_website for archived clone ----
        if path.startswith('/_astro/') or path.startswith('/parastorage/') or path.startswith('/__offline__/'):
            full = os.path.normpath(os.path.join(ROOT, 'clientprovideddata', 'cloned_website', path.lstrip('/').replace('/', os.sep)))
            if os.path.isfile(full):
                return self.serve_file(full, head_only)

        # ---- /cloned_website mount: archived mirror ----
        if path == '/cloned_website' or path == '/cloned_website/':
            return self.serve_file(os.path.join(ROOT, 'clientprovideddata', 'cloned_website', 'index.html'), head_only)
        if path.startswith('/cloned_website/'):
            rel = path[len('/cloned_website/'):]
            full = os.path.normpath(os.path.join(ROOT, 'clientprovideddata', 'cloned_website', rel.replace('/', os.sep)))
            if os.path.isfile(full):
                return self.serve_file(full, head_only)
            return self.serve_file(os.path.join(ROOT, 'clientprovideddata', 'cloned_website', 'index.html'), head_only)

        return super().do_GET()

    def serve_file(self, full, head_only=False):
        ext = os.path.splitext(full)[1].lower()
        ctype = MIME.get(ext) or 'application/octet-stream'
        try:
            sz = os.path.getsize(full)
        except OSError:
            self.send_error(404)
            return
        try:
            self.send_response(200)
            self.send_header('Content-Type', ctype)
            self.send_header('Content-Length', str(sz))
            self.end_headers()
            if not head_only:
                with open(full, 'rb') as f:
                    while True:
                        chunk = f.read(65536)
                        if not chunk:
                            break
                        self.wfile.write(chunk)
        except (ConnectionResetError, BrokenPipeError):
            pass

    def translate_path(self, path):
        path = urllib.parse.unquote(path.split('?')[0])
        if path.endswith('/'):
            path += 'index.html'
        full = os.path.normpath(os.path.join(ROOT, path.lstrip('/')))
        if os.path.isdir(full):
            full = os.path.join(full, 'index.html')
        if os.path.isfile(full):
            return full
        root_index = os.path.join(ROOT, 'index.html')
        if os.path.isfile(root_index):
            return root_index
        return os.path.join(ROOT, 'app', 'index.html')

    def guess_type(self, path):
        ext = os.path.splitext(path)[1].lower()
        if ext in MIME:
            return MIME[ext]
        return super().guess_type(path)


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    print(f"Serving {ROOT}")
    print(f"http://localhost:{PORT}/app/  (Flagship App)")
    print(f"http://localhost:{PORT}/cloned_website/  (Archived Clone)")
    with Server(('127.0.0.1', PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nbye')
