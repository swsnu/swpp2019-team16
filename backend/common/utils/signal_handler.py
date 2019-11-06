import asyncio
import functools
import signal


def register_signal_handler(loop, shutdown):
    for signame in ('SIGINT', 'SIGTERM'):
        loop.add_signal_handler(
            getattr(signal, signame),
            functools.partial(asyncio.ensure_future,
                              shutdown(signame, loop)))


async def shutdown_process(self, sig, loop):
    print('caught {0}'.format(sig))
    tasks = [task for task in asyncio.Task.all_tasks() if task is not
             asyncio.tasks.Task.current_task()]

    list(map(lambda task: task.cancel(), tasks))
    results = await asyncio.gather(*tasks, return_exceptions=True)

    print('finished awaiting cancelled tasks, results: {0}'
          .format(results))
    loop.stop()
