import threading


class PeerSet(object):
    def __init__(self):
        self._peers_lock = threading.RLock()
        self._peers = {}

    def connect(self, peer):
        print("Peer {} connecting".format(peer))
        with self._peers_lock:
            if peer not in self._peers:
                self._peers[peer] = 1
            else:
                self._peers[peer] += 1

    def disconnect(self, peer):
        print("Peer {} disconnecting".format(peer))
        with self._peers_lock:
            if peer not in self._peers:
                raise RuntimeError("Tried to disconnect peer '{}' \
                    but it was never connected.".format(peer))
            self._peers[peer] -= 1
            if self._peers[peer] == 0:
                del self._peers[peer]

    def peers(self):
        with self._peers_lock:
            return self._peers.keys()
