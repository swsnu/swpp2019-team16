import threading


class PeerSet(object):
    def __init__(self):
        self._peers_lock = threading.RLock()
        self._peers = {}
        self._connections = {}

    def connect(self, conn_id, peer):
        print("Peer {} connected... ID: {}".format(peer, conn_id))
        with self._peers_lock:
            if peer not in self._peers:
                self._peers[peer] = 1
            else:
                self._peers[peer] += 1
            self._connections[conn_id] = peer

    def disconnect(self, conn_id, peer):
        print("Peer {} disconnected... ID: {}".format(peer, conn_id))
        with self._peers_lock:
            if peer not in self._peers:
                raise RuntimeError("Tried to disconnect peer '{}' \
                    but it was never connected.".format(peer))

            self._peers[peer] -= 1
            del self._connections[conn_id]

            if self._peers[peer] == 0:
                del self._peers[peer]

    def peers(self):
        with self._peers_lock:
            return self._peers.keys()
