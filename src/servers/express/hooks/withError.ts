import AppError from '../../../_core/errors/AppError.class';

/**
 * Add error handler to all controllers
 * @param {any} ctr Controllers
 * @return {anu} Controllers wrapped with error handler
 */
export default function withError(ctr: any) {
  const c: any = {};
  const keys = Object.keys(ctr);

  keys.forEach((it: string) => {
    c[it] = async (req: any, res: any) => {
      try {
        return await ctr[it](req, res);
      } catch (e: unknown) {
        const error = e as AppError;

        return res.status(error.code || 500).json({
          status: error.code || 500,
          message: error.message || 'Bad Gateway',
        });
      }
    };
  });

  return c;
}
