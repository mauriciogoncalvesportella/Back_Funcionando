import { Request, Response, NextFunction } from 'express';

export function VersionControlMiddleware (req: Request, res: Response, next: NextFunction) {
  if (req.headers['authorization'] === process.env.TOKEN) {
    return next()
  }

  res.header('Access-Control-Expose-Headers', 'version-control')
  res.header('version-control', process.env.VERSION)
  const byPassUrl = ['3cx', 'auth', 'commerce', 'files', 'image']
  const byPass = byPassUrl.some(url => req.baseUrl.includes(url))
  if (req.headers['version-control'] === process.env.VERSION || byPass) {
    return next()
  }
  return res.send('Nova versão!')
}
