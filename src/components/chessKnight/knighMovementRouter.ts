const express = require('express')
const router = express.Router()
import * as handlers from './knightMovementHandler'

router.post('/knight/moves', handlers.possibleMoves )

export default router